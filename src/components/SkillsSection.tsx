"use client";

import React, { useState } from "react";
import { SKILLS_DATA, type SkillItem } from "@/data/portfolioData";
import { Braces, Code2, Database, Globe, Server, Layers } from "lucide-react";
import { TECH_LOGOS } from "@/data/techLogos";
import { m as motion, AnimatePresence } from "framer-motion";
import ScaleToFit from "@/components/ScaleToFit";

type Cat = SkillItem["category"];
type Filter = "All" | Cat;

const CAT: Record<
  Cat,
  {
    icon: React.ComponentType<{ className?: string }>;
    grad: string; // icon bubble + bar
    text: string;
    soft: string; // chip bg
    g1: string; // border glow colours
    g2: string;
  }
> = {
  Frontend: {
    icon: Globe,
    grad: "from-[#4A90A4] to-[#357A8A]",
    text: "text-[#2A7F96]",
    soft: "bg-[#4A90A4]/12 border-[#4A90A4]/30",
    g1: "#4a90a4",
    g2: "#9ad4e6",
  },
  Backend: {
    icon: Server,
    grad: "from-[#5B8DEF] to-[#3F63C9]",
    text: "text-[#3F63C9]",
    soft: "bg-[#5B8DEF]/12 border-[#5B8DEF]/30",
    g1: "#5b8def",
    g2: "#a9c4ff",
  },
  Database: {
    icon: Database,
    grad: "from-[#8B6FE0] to-[#6A4FC4]",
    text: "text-[#6A4FC4]",
    soft: "bg-[#8B6FE0]/12 border-[#8B6FE0]/30",
    g1: "#8b6fe0",
    g2: "#c9b8ff",
  },
  Programming: {
    icon: Code2,
    grad: "from-[#3FBF9F] to-[#1F8F76]",
    text: "text-[#1F8F76]",
    soft: "bg-[#3FBF9F]/12 border-[#3FBF9F]/30",
    g1: "#3fbf9f",
    g2: "#9be8d2",
  },
};

const LEVEL: Record<string, number> = {
  Expert: 95,
  Advanced: 80,
  Intermediate: 62,
};

const FILTERS: Filter[] = ["All", "Frontend", "Backend", "Database", "Programming"];

/** White tile showing the technology's real logo in its brand colours. */
function TechBadge({ name, tint }: { name: string; tint: string }) {
  const logos = TECH_LOGOS[name];
  return (
    <span
      className="keep-original mb-3 compact:mb-2 flex h-12 w-12 compact:h-10 compact:w-10 items-center justify-center gap-0.5 rounded-2xl border border-[#4A90A4]/15 bg-white shadow-md transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
      role="img"
      aria-label={`${name} logo`}
    >
      {logos ? (
        logos.map((l, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            aria-hidden
            className={logos.length > 1 ? "h-[18px] w-[18px] compact:h-4 compact:w-4" : "h-7 w-7 compact:h-6 compact:w-6"}
            fill={l.color}
          >
            <path d={l.path} />
          </svg>
        ))
      ) : (
        // No single brand for this one (e.g. REST APIs): use a neutral glyph in the category colour.
        <Braces className="h-6 w-6 compact:h-5 compact:w-5" style={{ color: tint }} strokeWidth={2.2} />
      )}
    </span>
  );
}

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const c = CAT[skill.category];
  const Icon = c.icon;
  const pct = LEVEL[skill.level ?? "Advanced"] ?? 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        duration: 0.5,
        delay: (index % 5) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group glow-card [--glow-r:20px]"
      style={{ "--g1": c.g1, "--g2": c.g2 } as React.CSSProperties}
    >
      <div className="relative z-[1] flex h-full flex-col items-center overflow-hidden rounded-[18.5px] bg-gradient-to-b from-[#EAF6FC] to-[#DCEEF8] px-4 pb-4 pt-5 compact:px-2.5 compact:pb-3 compact:pt-3.5 text-center">
        <div className="card-shine" aria-hidden />

        <TechBadge name={skill.name} tint={c.g1} />

        <h3 className="font-display text-[15px] compact:text-[14px] font-bold leading-tight text-[#1F3A48]">
          {skill.name}
        </h3>

        <span
          className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2.5 compact:px-1.5 py-0.5 text-[11px] compact:text-[10.5px] font-semibold ${c.soft} ${c.text}`}
        >
          <Icon className="h-3 w-3" />
          {skill.category}
        </span>

        {/* Proficiency */}
        <div className="mt-3.5 compact:mt-2.5 w-full">
          <div className="mb-1 flex items-center justify-between text-[10.5px] compact:text-[10px] font-medium text-[#4A6B7A]">
            <span>{skill.level}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/80">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${c.grad}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.25 + (index % 5) * 0.07, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [filter, setFilter] = useState<Filter>("All");

  const shown =
    filter === "All" ? SKILLS_DATA : SKILLS_DATA.filter((s) => s.category === filter);
  const countFor = (f: Filter) =>
    f === "All" ? SKILLS_DATA.length : SKILLS_DATA.filter((s) => s.category === f).length;

  return (
    <section
      id="skills"
      className="keep-original isolate relative overflow-hidden bg-[linear-gradient(180deg,#0A2029_0%,#0E3340_50%,#0A2029_100%)] pb-16 pt-14 md:pb-24 md:pt-20"
    >
      {/* Deep-teal highlight band: hairlines, dot grid and soft glows */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-300/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(153,246,228,0.22)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-teal-400/20 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-sky-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-1.5 text-[13px] font-semibold text-teal-200">
            <Layers className="h-3.5 w-3.5" />
            Core competencies
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            Languages, frameworks &amp;{" "}
            <span className="bg-gradient-to-r from-teal-200 to-sky-300 bg-clip-text text-transparent">tooling</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            A production-proven stack chosen for speed, performance and
            long-term maintainability.
          </p>
        </motion.div>

        {/* Category filter (colour-coded) */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            const dot = f === "All" ? "#99F6E4" : CAT[f].g2;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  active
                    ? "border-teal-200 bg-teal-200 text-[#0A2029] shadow-lg shadow-teal-300/20"
                    : "border-white/15 bg-white/5 text-slate-300 hover:border-teal-200/50 hover:text-white"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: active ? "#0A2029" : dot }}
                />
                {f}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10.5px] leading-none ${
                    active ? "bg-[#0A2029]/15 text-[#0A2029]" : "bg-white/10 text-slate-300"
                  }`}
                >
                  {countFor(f)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <ScaleToFit designWidth={780} compactWidth={440} fluid>
        <div className="grid grid-cols-2 gap-4 compact:gap-2.5 sm:grid-cols-3 md:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {shown.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </div>
        </ScaleToFit>
      </div>
    </section>
  );
}
