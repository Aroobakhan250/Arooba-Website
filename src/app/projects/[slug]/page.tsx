import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink, Images } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROJECTS_DATA, PERSONAL_INFO } from "@/data/portfolioData";
import { CASE_STUDIES } from "@/data/caseStudies";
import { SITE_URL } from "@/data/site";

type Params = { slug: string };

const isVideo = (src: string) => src.endsWith(".mp4") || src.endsWith(".webm");
const shortName = (title: string) => title.split(" — ")[0].trim();

export function generateStaticParams(): Params[] {
  return PROJECTS_DATA.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === slug);
  if (!project) return {};
  const study = CASE_STUDIES[slug];
  const title = `${project.title} | Case Study`;
  const description = study?.tagline ? `${study.tagline} ${project.description}` : project.description;
  const cover = project.thumbnail ?? project.image;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${slug}`,
      title,
      description,
      images: [{ url: cover, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [cover] },
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = PROJECTS_DATA.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = PROJECTS_DATA[index];
  const study = CASE_STUDIES[slug];
  const next = PROJECTS_DATA[(index + 1) % PROJECTS_DATA.length];
  const cover = project.thumbnail ?? project.image;
  const media = (project.images && project.images.length > 0 ? project.images : [project.image]).filter(
    (src) => src !== cover
  );
  const screens = media.filter((s) => !isVideo(s));
  const videos = media.filter(isVideo);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: `${SITE_URL}${cover}`,
    url: `${SITE_URL}/projects/${slug}`,
    keywords: project.tags.join(", "),
    author: { "@type": "Person", name: PERSONAL_INFO.name, url: SITE_URL },
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-[#EAF6FC] via-[#F5FBFF] to-[#E0F0F8] text-[#1F3A48] selection:bg-[#4A90A4] selection:text-white">
      <script
        type="application/ld+json"
        // JSON.stringify output is safe here; "<" is escaped to avoid closing the tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="pointer-events-none fixed -left-32 top-16 -z-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(184,216,232,0.7),transparent)]" />
      <div className="pointer-events-none fixed -right-28 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.2),transparent)]" />

      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-grow px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-2 text-[13px] font-semibold text-[#357A8A] shadow-sm transition-all hover:border-[#4A90A4] hover:text-[#1F3A48] hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mt-8 max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#357A8A] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A90A4]" />
            {project.category}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {shortName(project.title)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#4A6B7A] sm:text-xl">
            {study?.tagline ?? project.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-[#4A90A4]/20 bg-white/80 px-2.5 py-1 text-[12px] font-medium text-[#357A8A]"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1F3A48] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4A90A4]"
              >
                Live demo <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3A48] transition-all hover:border-[#4A90A4]"
              >
                Source code <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F3A48] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4A90A4]"
            >
              Request something similar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Cover */}
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[#4A90A4]/20 bg-[#0d151e] shadow-[0_30px_70px_-25px_rgba(53,122,138,0.45)]">
          <Image
            src={cover}
            alt={`${shortName(project.title)} cover`}
            fill
            priority
            quality={80}
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover object-center"
          />
        </div>

        {/* Results strip */}
        {study && (
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {study.results.map((r) => (
              <div key={r.label} className="rounded-2xl border border-[#4A90A4]/20 bg-white/85 p-5 shadow-sm">
                <dt className="text-[12px] font-semibold uppercase tracking-wide text-[#357A8A]">{r.label}</dt>
                <dd className="mt-1 font-display text-xl font-bold text-[#1F3A48]">{r.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Story */}
        <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">The challenge</h2>
              <p className="mt-3 leading-relaxed text-[#4A6B7A]">{study?.challenge ?? project.description}</p>
            </div>
            {study && (
              <>
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight">The solution</h2>
                  <p className="mt-3 leading-relaxed text-[#4A6B7A]">{study.solution}</p>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight">Key features</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {study.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 rounded-xl border border-[#4A90A4]/15 bg-white/80 p-3.5 text-[14px] leading-snug text-[#2C4A5A]"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#357A8A]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-[#4A90A4]/20 bg-white/85 p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-bold">My role</h2>
            <ul className="mt-3 space-y-2 text-[14px] text-[#4A6B7A]">
              {(study?.role ?? ["Design and development"]).map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A90A4]" />
                  {r}
                </li>
              ))}
            </ul>
            <h2 className="mt-6 font-display text-lg font-bold">Tech stack</h2>
            <p className="mt-2 text-[14px] text-[#4A6B7A]">{project.subtitle}</p>
          </aside>
        </section>

        {/* Screens */}
        {screens.length > 0 && (
          <section className="mt-16">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
              <Images className="h-5 w-5 text-[#357A8A]" /> Screens
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {screens.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#4A90A4]/20 bg-[#0d151e]"
                >
                  <Image
                    src={src}
                    alt={`${shortName(project.title)}, screen ${i + 1}`}
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos load nothing until the visitor presses play */}
        {videos.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold tracking-tight">Demo recordings</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {videos.map((src) => (
                <video
                  key={src}
                  src={src}
                  controls
                  preload="none"
                  playsInline
                  className="aspect-[16/10] w-full rounded-2xl border border-[#4A90A4]/20 bg-[#0d151e] object-contain"
                />
              ))}
            </div>
          </section>
        )}

        {/* Next project */}
        <Link
          href={`/projects/${next.id}`}
          className="group mt-16 flex items-center justify-between gap-4 rounded-2xl border border-[#4A90A4]/25 bg-white p-6 shadow-sm transition-all hover:border-[#4A90A4] hover:shadow-md"
        >
          <span>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#357A8A]">Next project</span>
            <span className="mt-1 block font-display text-xl font-bold">{shortName(next.title)}</span>
          </span>
          <ArrowRight className="h-5 w-5 text-[#4A90A4] transition-transform group-hover:translate-x-1" />
        </Link>
      </main>

      <Footer />
    </div>
  );
}
