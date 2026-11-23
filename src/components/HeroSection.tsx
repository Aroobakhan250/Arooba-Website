"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowDownRight,
  Star,
  Quote,
  Award,
  Mail,
  Briefcase,
  Code2,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Zap,
  TrendingUp,
} from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import ScaleToFit from "@/components/ScaleToFit";

/* ─────────────────────────────────────────────────────────────
   SHARED TEXT STYLES (light theme)
───────────────────────────────────────────────────────────── */
const TEAL = "#4A90A4";

const SlideTitle = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
  <h3
    className={`font-display text-lg compact:text-[15px] font-bold tracking-tight text-[#1F3A48] ${right ? "text-right" : ""}`}
  >
    {children}
  </h3>
);

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 compact:gap-2 rounded-xl border border-[#4A90A4]/20 bg-white/70 p-3 compact:p-2">
    <div className="rounded-lg bg-[#4A90A4]/12 p-2 compact:p-1.5 text-[#357A8A]">{icon}</div>
    <div className="min-w-0">
      <p className="text-[11px] compact:hidden font-medium text-[#4A6B7A]">{label}</p>
      <p className="text-[13px] compact:text-[12.5px] font-semibold leading-snug text-[#1F3A48]">{value}</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   LEFT SLIDES
───────────────────────────────────────────────────────────── */
const LEFT_SLIDES = [
  {
    key: "identity",
    label: "Profile",
    icon: <Award className="h-3.5 w-3.5" />,
    content: (
      <div className="flex flex-col gap-3.5 compact:gap-2.5">
        <SlideTitle>Idea to production</SlideTitle>
        <p className="text-[13px] leading-relaxed text-[#4A6B7A] compact:hidden">
          Interface, backend, database and AI integration, handled by a single
          accountable developer.
        </p>
        <InfoRow
          icon={<GraduationCap className="h-4 w-4" />}
          label="Education"
          value="BS Computer Engineering, SSUET"
        />
        <InfoRow
          icon={<Briefcase className="h-4 w-4" />}
          label="Experience"
          value="4+ years with clients worldwide"
        />
      </div>
    ),
  },
  {
    key: "connect",
    label: "Connect",
    icon: <Mail className="h-3.5 w-3.5" />,
    content: (
      <div className="flex flex-col gap-3.5">
        <SlideTitle>Get in touch</SlideTitle>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              href: PERSONAL_INFO.socialLinks.linkedin,
              label: "LinkedIn",
              icon: <LinkedinIcon className="h-4 w-4" />,
            },
            {
              href: PERSONAL_INFO.socialLinks.upwork,
              label: "Upwork",
              icon: <span className="text-sm font-black leading-none">Up</span>,
            },
            {
              href: `mailto:${PERSONAL_INFO.socialLinks.email}`,
              label: "Email",
              icon: <Mail className="h-4 w-4" />,
            },
            {
              href: `mailto:${PERSONAL_INFO.socialLinks.businessEmail}`,
              label: "Business",
              icon: <Briefcase className="h-4 w-4" />,
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 compact:gap-1 rounded-xl border border-[#4A90A4]/20 bg-white/70 p-3 compact:p-2 text-[#357A8A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4A90A4]/50 hover:bg-white hover:shadow-md"
            >
              {s.icon}
              <span className="text-[11px] compact:text-[11.5px] font-semibold text-[#1F3A48]">{s.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 compact:gap-2 rounded-xl border border-[#4A90A4]/20 bg-white/70 p-3 compact:p-2">
          <div className="flex gap-0.5 compact:hidden" aria-hidden>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="border-l compact:border-l-0 border-[#4A90A4]/20 pl-3 compact:pl-0">
            <p className="text-[13px] compact:text-[12.5px] font-bold text-[#1F3A48]"><Star className="hidden compact:inline h-3.5 w-3.5 mr-1 -mt-0.5 fill-amber-400 text-amber-400" />5.0 <span className="compact:hidden">out of 5</span></p>
            <p className="text-[11px] compact:hidden text-[#4A6B7A]">Average client rating</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "stats",
    label: "Results",
    icon: <TrendingUp className="h-3.5 w-3.5" />,
    content: (
      <div className="flex flex-col gap-3.5 compact:gap-2.5">
        <SlideTitle>Results so far</SlideTitle>
        <div className="grid grid-cols-3 compact:grid-cols-1 gap-2.5 compact:gap-1.5">
          {PERSONAL_INFO.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col compact:flex-row items-center justify-center compact:justify-between rounded-xl border border-[#4A90A4]/20 bg-white/70 px-2 py-3 compact:px-3 compact:py-1.5 text-center"
            >
              <span className="font-display text-2xl compact:text-xl font-extrabold text-[#357A8A]">
                {s.value}
              </span>
              <span className="mt-1 compact:mt-0 text-[10.5px] compact:text-[11px] compact:text-right font-medium leading-tight text-[#4A6B7A]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="compact:hidden">
          <InfoRow
            icon={<Zap className="h-4 w-4" />}
            label="Project kickoff"
            value="Within 24 to 48 hours"
          />
        </div>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   RIGHT SLIDES
───────────────────────────────────────────────────────────── */
const RIGHT_SLIDES = [
  {
    key: "hire",
    label: "Services",
    icon: <Sparkles className="h-3.5 w-3.5" />,
    content: (
      <div className="flex flex-col items-end gap-3.5">
        <a
          href="#contact"
          aria-label="Start a project"
          className="group relative flex compact:hidden h-20 w-20 items-center justify-center rounded-full border border-dashed border-[#4A90A4]/60"
        >
          <svg className="animate-spin-slow absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
            <path id="circlePathR" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text className="fill-[#4A6B7A] text-[9px] font-bold tracking-[0.26em]">
              <textPath xlinkHref="#circlePathR">AVAILABLE FOR HIRE •</textPath>
            </text>
          </svg>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90A4] text-white shadow-lg shadow-[#4A90A4]/40 transition-transform group-hover:scale-110">
            <ArrowDownRight className="h-4 w-4" />
          </span>
        </a>

        <div className="w-full rounded-xl border border-[#4A90A4]/20 bg-white/70 p-4 compact:p-2.5">
          <Quote className="mb-2 compact:mb-1 h-4 w-4 compact:h-3.5 compact:w-3.5 text-[#4A90A4]" />
          <p className="text-[13px] compact:text-[12px] font-medium leading-relaxed text-[#1F3A48]">
            Fast web applications, AI assistants and cloud-ready systems,
            engineered with clean code that scales as your business grows.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "trust",
    label: "Approach",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    content: (
      <div className="flex flex-col gap-2.5 compact:gap-1.5">
        <SlideTitle right>Working with me</SlideTitle>
        {[
          { icon: <ShieldCheck className="h-4 w-4" />, text: "Delivery on the agreed date" },
          { icon: <Zap className="h-4 w-4" />, text: "Kickoff within 24 to 48 hours" },
          { icon: <Star className="h-4 w-4" />, text: "Clear updates at every milestone" },
          { icon: <Code2 className="h-4 w-4" />, text: "Documented, scalable codebase" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 compact:gap-1.5 rounded-xl border border-[#4A90A4]/20 bg-white/70 p-2.5 compact:p-1.5"
          >
            <span className="rounded-lg bg-[#4A90A4]/12 p-1.5 compact:hidden text-[#357A8A]">{item.icon}</span>
            <p className="text-[12.5px] compact:text-[11.5px] font-semibold leading-snug text-[#1F3A48]">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─────────────────────────────────────────────────────────────
   GLASS CARD
───────────────────────────────────────────────────────────── */
const glassStyle: React.CSSProperties = {
  background: "linear-gradient(150deg, rgba(255,255,255,0.92) 0%, rgba(214,235,245,0.70) 100%)",
  border: "1px solid rgba(74,144,164,0.25)",
  boxShadow:
    "0 18px 50px -12px rgba(53,122,138,0.25), 0 2px 6px rgba(31,58,72,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
  overflow: "hidden",
};

function TabBar({
  slides,
  current,
  onSelect,
  align = "left",
}: {
  slides: { key: string; label: string; icon: React.ReactNode }[];
  current: number;
  onSelect: (i: number) => void;
  align?: "left" | "right";
}) {
  return (
    <div
      role="tablist"
      className={`mb-5 compact:mb-3 flex gap-1.5 compact:gap-1 ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      {slides.map((s, i) => (
        <button
          key={s.key}
          role="tab"
          aria-selected={i === current}
          onClick={() => onSelect(i)}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 compact:px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
            i === current
              ? "bg-[#4A90A4] text-white shadow-md shadow-[#4A90A4]/30"
              : "text-[#4A6B7A] hover:bg-white/70 hover:text-[#1F3A48]"
          }`}
        >
          {s.icon}
          <span className="compact:hidden">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

function Dots({ total, current }: { total: number; current: number }) {
  return (
    <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: i === current ? 22 : 6,
            background: i === current ? `linear-gradient(90deg, ${TEAL}, #357A8A)` : "rgba(74,144,164,0.25)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [leftSlide, setLeftSlide] = useState(0);
  const [leftDir, setLeftDir] = useState(1);
  const [rightSlide, setRightSlide] = useState(0);
  const [rightDir, setRightDir] = useState(1);
  const [pausedLeft, setPausedLeft] = useState(false);
  const [pausedRight, setPausedRight] = useState(false);

  const goLeft = (i: number) => {
    setLeftDir(i > leftSlide ? 1 : -1);
    setLeftSlide(i);
  };
  const goRight = (i: number) => {
    setRightDir(i > rightSlide ? 1 : -1);
    setRightSlide(i);
  };

  useEffect(() => {
    if (pausedLeft) return;
    const t = setInterval(() => {
      setLeftDir(1);
      setLeftSlide((p) => (p + 1) % LEFT_SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, [pausedLeft]);

  useEffect(() => {
    if (pausedRight) return;
    let t: ReturnType<typeof setInterval>;
    const delay = setTimeout(() => {
      t = setInterval(() => {
        setRightDir(1);
        setRightSlide((p) => (p + 1) % RIGHT_SLIDES.length);
      }, 5000);
    }, 2500);
    return () => {
      clearTimeout(delay);
      clearInterval(t);
    };
  }, [pausedRight]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-10 pt-24 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28"
    >
      {/* Soft background accents */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.14),transparent)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(rgba(74,144,164,0.22)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        {/* ══════════ HEADLINE ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold leading-none tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
            <span className="text-[#1F3A48]">Arooba Alam </span>
            <span className="bg-gradient-to-br from-[#4A90A4] via-[#357A8A] to-[#7BB8C8] bg-clip-text text-transparent">
              Khan
            </span>
          </h1>

          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1F3A48] sm:text-xs">
              Full Stack Developer
            </span>
            <span className="h-1 w-1 rounded-full bg-[#4A90A4]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#357A8A] sm:text-xs">
              Solutions Architect
            </span>
            <span className="h-1 w-1 rounded-full bg-[#4A90A4]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4A6B7A] sm:text-xs">
              AI Integrations
            </span>
          </div>

          {/* Value proposition */}
          <div className="mx-auto mt-9 max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-[#1F3A48] sm:text-4xl lg:text-5xl">
              Hire a Developer Who{" "}
              <span className="relative inline-block text-[#357A8A]">
                Delivers
                <svg
                  className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 8 C 40 2, 90 2, 130 6 S 185 9, 198 4"
                    stroke="#4A90A4"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#4A6B7A] sm:text-base">
              I build complete, production-ready products on my own, so you get
              one person who understands your goals and takes full
              responsibility for the result.
            </p>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {["One point of contact", "Production-ready code", "On-time delivery"].map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#4A90A4]/25 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#1F3A48] shadow-sm"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#4A90A4]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ══════════ 3-COLUMN GRID ══════════ */}
        <ScaleToFit designWidth={1100} compactWidth={430}>
        <div className="grid grid-cols-12 items-center gap-8 compact:gap-2">
          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="z-20 col-span-4 rounded-[28px] compact:rounded-[18px]"
            style={glassStyle}
            onMouseEnter={() => setPausedLeft(true)}
            onMouseLeave={() => setPausedLeft(false)}
          >
            <div className="p-6 compact:p-2.5">
              <TabBar slides={LEFT_SLIDES} current={leftSlide} onSelect={goLeft} align="left" />
              <div className="relative min-h-[250px] compact:min-h-[205px]">
                <AnimatePresence mode="wait" custom={leftDir}>
                  <motion.div
                    key={LEFT_SLIDES[leftSlide].key}
                    custom={leftDir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {LEFT_SLIDES[leftSlide].content}
                  </motion.div>
                </AnimatePresence>
              </div>
              <Dots total={LEFT_SLIDES.length} current={leftSlide} />
            </div>
          </motion.div>

          {/* CENTER PHOTO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative col-span-4 flex flex-col items-center justify-center"
          >
            <div className="relative aspect-[4/5] w-full max-w-[360px] rounded-[30px] border border-[#4A90A4]/30 bg-gradient-to-b from-[#4A90A4]/45 via-white/30 to-[#7BB8C8]/55 p-[3px] shadow-[0_34px_70px_-18px_rgba(53,122,138,0.45)]">
              <div className="relative h-full w-full overflow-hidden rounded-[27px] border border-[#4A90A4]/15 bg-[#E0F0F8]">
                <Image
                  src="/arooba-hero.png"
                  alt="Arooba Alam Khan, full-stack developer"
                  fill
                  priority
                  className="object-cover object-top brightness-[1.02] contrast-[1.03]"
                  sizes="(max-width: 768px) 300px, 360px"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#E0F0F8] via-[#E0F0F8]/30 to-transparent" />
                <div className="absolute left-3.5 top-3.5 compact:left-1.5 compact:top-1.5 flex items-center gap-2 compact:gap-1 rounded-full border border-[#4A90A4]/20 bg-white/90 px-3 py-1.5 compact:px-1.5 compact:py-0.5 shadow-md">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-[11px] compact:text-[9.5px] font-semibold text-[#1F3A48]">Open for projects</span>
                </div>
              </div>

              <div className="absolute -bottom-5 compact:-bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center whitespace-nowrap rounded-full border border-[#4A90A4]/20 bg-white p-1.5 compact:p-0.5 shadow-2xl shadow-[#4A90A4]/25">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4A90A4] px-5 py-2.5 compact:px-2.5 compact:py-1.5 text-xs compact:text-[10px] font-bold text-white shadow-md shadow-[#4A90A4]/30 transition-colors duration-200 hover:bg-[#357A8A] sm:text-sm"
                >
                  View my work
                  <ArrowRight className="h-3.5 w-3.5 compact:hidden" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-5 py-2.5 compact:px-2 compact:py-1.5 text-xs compact:text-[10px] font-bold text-[#4A6B7A] transition-colors hover:text-[#357A8A] sm:text-sm"
                >
                  Hire me
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="z-20 col-span-4 rounded-[28px] compact:rounded-[18px]"
            style={glassStyle}
            onMouseEnter={() => setPausedRight(true)}
            onMouseLeave={() => setPausedRight(false)}
          >
            <div className="p-6 compact:p-2.5">
              <TabBar slides={RIGHT_SLIDES} current={rightSlide} onSelect={goRight} align="right" />
              <div className="relative min-h-[250px] compact:min-h-[205px]">
                <AnimatePresence mode="wait" custom={rightDir}>
                  <motion.div
                    key={RIGHT_SLIDES[rightSlide].key}
                    custom={rightDir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {RIGHT_SLIDES[rightSlide].content}
                  </motion.div>
                </AnimatePresence>
              </div>
              <Dots total={RIGHT_SLIDES.length} current={rightSlide} />
            </div>
          </motion.div>
        </div>
        </ScaleToFit>
      </div>
    </section>
  );
}
