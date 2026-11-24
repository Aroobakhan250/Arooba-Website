"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, MousePointer2 } from "lucide-react";
import { m as motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA, type ProjectItem } from "@/data/portfolioData";
import ScaleToFit from "@/components/ScaleToFit";

type CategoryFilter =
  | "All"
  | "AI & Chatbots"
  | "E-Commerce & Management"
  | "Web Apps & Dashboards"
  | "Games & Automation";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "AI & Chatbots",
  "E-Commerce & Management",
  "Web Apps & Dashboards",
  "Games & Automation",
];

function splitTitle(title: string) {
  const [name, ...rest] = title.split(" — ");
  return { name, kind: rest.join(" — ") };
}

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const baseList =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];
  // Designed thumbnail is shown at rest; hover cycles through the project media.
  const hasThumb = Boolean(project.thumbnail);
  const imageList = hasThumb ? [project.thumbnail as string, ...baseList] : baseList;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Slide only while hovered; return to the thumbnail as soon as the mouse leaves.
  useEffect(() => {
    if (isHovered && imageList.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % imageList.length);
      }, 1400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, imageList.length]);

  const { name, kind } = splitTitle(project.title);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentIdx(0);
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => {
        setIsHovered(false);
        setCurrentIdx(0);
      }}
      className="group glow-card"
    >
      <div className="relative z-[1] flex h-full flex-col overflow-hidden rounded-[20.5px] bg-gradient-to-b from-[#EAF6FC] to-[#DCEEF8]">
      {/* Media */}
      <div className="card-shine" aria-hidden />
      <div
        className={`keep-original relative w-full overflow-hidden bg-[#0d151e] ${
          hasThumb ? "aspect-[4/3]" : "aspect-[16/10]"
        }`}
      >
        {imageList.map((src, idx) => {
          // Only load what is needed: the thumbnail always, and (while hovering) the
          // current + next item. Everything else stays unloaded until it is its turn.
          const nextIdx = (currentIdx + 1) % imageList.length;
          const shouldRender = idx === 0 || (isHovered && (idx === currentIdx || idx === nextIdx));
          if (!shouldRender) return null;
          const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
          const isThumb = hasThumb && idx === 0;
          return (
            <div
              key={src + idx}
              className={`absolute transition-opacity duration-700 ease-in-out ${
                isThumb ? "inset-0" : "inset-3"
              } ${idx === currentIdx ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
            >
              {isVideo ? (
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full rounded-lg object-contain"
                />
              ) : (
                <Image
                  src={src}
                  alt={isThumb ? `${name} thumbnail` : `${name} preview ${idx + 1}`}
                  fill
                  quality={80}
                  className={
                    isThumb
                      ? "object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      : "rounded-lg object-contain object-center"
                  }
                  sizes="430px"
                />
              )}
            </div>
          );
        })}

        {/* Category chip */}
        <span className="absolute left-3 top-3 compact:left-2 compact:top-2 z-20 rounded-full bg-white/95 px-3 py-1 compact:px-2 compact:py-0.5 text-[11px] compact:text-[10px] font-semibold text-[#1F3A48] shadow-sm">
          {project.category}
        </span>

        {/* Hint at rest / progress dots on hover */}
        <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
          <span
            className={`flex items-center gap-1.5 rounded-full bg-[#1F3A48]/85 px-3 py-1 compact:px-2 compact:py-0.5 text-[11px] compact:text-[10px] font-medium text-white transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          >
            <MousePointer2 className="h-3 w-3" />
            <span className="compact:hidden">Hover to preview</span>
            <span className="hidden compact:inline">Tap to preview</span>
          </span>
          <div
            className={`absolute inset-0 flex items-center justify-center gap-1 rounded-full bg-[#1F3A48]/70 px-3 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          >
            {imageList.slice(0, 12).map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIdx % 12 ? "w-3.5 bg-white" : "w-1 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 compact:p-3">
        <h3 className="font-display text-[17px] compact:text-[15px] compact:line-clamp-2 font-bold leading-snug tracking-tight text-[#1F3A48]">
          {name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[12px] compact:text-[11.5px] font-medium text-[#357A8A]">
          {kind || project.subtitle}
        </p>

        <p className="mt-2.5 line-clamp-2 compact:hidden text-[13px] leading-relaxed text-[#4A6B7A]">
          {project.description}
        </p>

        <ul className="mb-4 mt-3 compact:mb-3 compact:mt-2 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-[#4A90A4]/20 bg-white/80 px-2 py-0.5 text-[11px] compact:text-[10.5px] compact:nth-[n+3]:hidden font-medium text-[#357A8A]"
            >
              {tag}
            </li>
          ))}
          {project.tags.length > 3 && (
            <li className="px-1.5 py-1 text-[11.5px] compact:hidden font-medium text-[#4A6B7A]">
              +{project.tags.length - 3}
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 compact:gap-2 border-t border-[#4A90A4]/20 pt-3 compact:pt-2.5">
          <Link
            href={`/gallery#${project.id}`}
            className="inline-flex items-center gap-1 text-[12px] compact:text-[11.5px] font-semibold text-[#357A8A] transition-colors hover:text-[#1F3A48]"
          >
            <span className="compact:hidden">View all screens</span>
            <span className="hidden compact:inline">Screens</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href="#contact"
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[#1F3A48] px-3.5 compact:px-3 py-1.5 text-[11.5px] font-semibold text-white transition-colors hover:bg-[#4A90A4]"
          >
            <span className="compact:hidden">Request similar</span>
            <span className="hidden compact:inline">Request</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<CategoryFilter>("All");

  const filtered =
    selected === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selected);

  const countFor = (c: CategoryFilter) =>
    c === "All" ? PROJECTS_DATA.length : PROJECTS_DATA.filter((p) => p.category === c).length;

  return (
    <section
      id="projects"
      className="isolate relative overflow-hidden border-y border-[#4A90A4]/20 bg-white pb-14 pt-8 md:pb-16 md:pt-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(rgba(74,144,164,0.22)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#357A8A] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A90A4]" />
            {PROJECTS_DATA.length} projects shipped
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1F3A48] sm:text-5xl lg:text-6xl">
            Work I Have Delivered for Clients
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4A6B7A] sm:text-lg">
            Websites, platforms and AI tools built from scratch. Each one is
            designed to look sharp, run smoothly and solve a real business
            problem.
          </p>
        </motion.div>

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter projects"
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          {CATEGORIES.map((cat) => {
            const active = selected === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(cat)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  active
                    ? "border-[#1F3A48] bg-[#1F3A48] text-white shadow-lg shadow-[#1F3A48]/20"
                    : "border-[#4A90A4]/25 bg-white text-[#4A6B7A] hover:border-[#4A90A4]/60 hover:text-[#1F3A48]"
                }`}
              >
                {cat}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10.5px] leading-none ${
                    active ? "bg-white/20 text-white" : "bg-[#4A90A4]/12 text-[#357A8A]"
                  }`}
                >
                  {countFor(cat)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <ScaleToFit designWidth={860} compactWidth={440} fluid>
        <div className="grid grid-cols-2 gap-5 compact:gap-2.5 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
        </ScaleToFit>

        {/* Gallery CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/30 bg-white px-6 py-3 text-sm font-semibold text-[#1F3A48] shadow-sm transition-all hover:border-[#4A90A4] hover:shadow-md"
          >
            Browse the full project gallery
            <ArrowRight className="h-4 w-4 text-[#4A90A4] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
