"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Rocket,
  HeartHandshake,
  CheckCircle2,
  FileCode2,
} from "lucide-react";
import {
  m as motion,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";

/* ─────────────────────────────────────────────────────────────
   COUNT-UP NUMBER
───────────────────────────────────────────────────────────── */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce || !match) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   CODE CONTENT (tokenised so it can be typed + syntax coloured)
───────────────────────────────────────────────────────────── */
type Tok = [string, string]; // [text, class]

const COLORS: Record<string, string> = {
  k: "text-[#7C5CD6]", // keyword
  n: "text-[#2A7F96]", // property / identifier
  s: "text-[#0F8A6D]", // string
  b: "text-[#C2570C]", // boolean / number
  f: "text-[#1F6FB5]", // function
  c: "text-[#8AA3B0] italic", // comment
  p: "text-[#4A6B7A]", // punctuation
  d: "text-[#1F3A48]", // default
};

const CODE: Tok[][] = [
  [["// about-me.ts", "c"]],
  [
    ["const ", "k"],
    ["developer ", "d"],
    ["= {", "p"],
  ],
  [
    ["  name", "n"],
    [": ", "p"],
    ['"Arooba Alam Khan"', "s"],
    [",", "p"],
  ],
  [
    ["  role", "n"],
    [": ", "p"],
    ['"Full-Stack Engineer"', "s"],
    [",", "p"],
  ],
  [
    ["  education", "n"],
    [": ", "p"],
    ['"BS Computer Engineering"', "s"],
    [",", "p"],
  ],
  [
    ["  experience", "n"],
    [": ", "p"],
    ['"6+ years"', "s"],
    [",", "p"],
  ],
  [
    ["  stack", "n"],
    [": [", "p"],
    ['"Next.js"', "s"],
    [", ", "p"],
    ['"React"', "s"],
    [", ", "p"],
    ['"Node.js"', "s"],
    [",", "p"],
  ],
  [
    ["    ", "d"],
    ['"Python"', "s"],
    [", ", "p"],
    ['"MySQL"', "s"],
    [", ", "p"],
    ['"OpenAI"', "s"],
    ["],", "p"],
  ],
  [
    ["  available", "n"],
    [": ", "p"],
    ["true", "b"],
    [",", "p"],
  ],
  [["};", "p"]],
  [["", "d"]],
  [
    ["developer", "d"],
    [".", "p"],
    ["deliver", "f"],
    ["(", "p"],
    ['"your project"', "s"],
    [");", "p"],
  ],
];

const COMMAND = "node about-me.ts";
const OUTPUT = "Delivered on time. Ready for your project.";

const TOTAL_CODE = CODE.reduce(
  (sum, line) => sum + line.reduce((s, [t]) => s + t.length, 0) + 1,
  0
);

function Cursor() {
  return (
    <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[3px] animate-pulse rounded-[1px] bg-[#4A90A4]" />
  );
}

/* ─────────────────────────────────────────────────────────────
   LIVE CODE WINDOW
───────────────────────────────────────────────────────────── */
function CodeWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);

  const END = TOTAL_CODE + COMMAND.length;
  const count = reduce ? END : typed;

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => {
      setTyped((c) => {
        if (c >= END) {
          clearInterval(t);
          return c;
        }
        return Math.min(c + 2, END);
      });
    }, 28);
    return () => clearInterval(t);
  }, [inView, reduce, END]);

  const codeDone = count >= TOTAL_CODE;
  const cmdTyped = Math.max(0, count - TOTAL_CODE);
  const finished = count >= END;

  // Render code lines up to the current budget
  let budget = count;
  const rendered: React.ReactNode[] = [];
  let lastLineIdx = -1;
  for (let i = 0; i < CODE.length; i++) {
    if (budget <= 0) break;
    const parts: React.ReactNode[] = [];
    for (let j = 0; j < CODE[i].length; j++) {
      if (budget <= 0) break;
      const [text, cls] = CODE[i][j];
      const shown = text.slice(0, budget);
      budget -= text.length;
      parts.push(
        <span key={j} className={COLORS[cls]}>
          {shown}
        </span>
      );
    }
    budget -= 1; // newline
    lastLineIdx = i;
    rendered.push(
      <div key={i} className="flex">
        <span
          className="w-8 shrink-0 select-none pr-3 text-right text-[#9DB6C2]"
          aria-hidden
        >
          {i + 1}
        </span>
        <span className="whitespace-pre">
          {parts}
          {!codeDone && i === lastLineIdx && <Cursor />}
        </span>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* soft glow behind the window */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[36px] bg-[radial-gradient(closest-side,rgba(74,144,164,0.25),transparent)] blur-2xl" />

      <div className="group glow-card [--glow-r:22px]">
      <div className="relative z-[1] overflow-hidden rounded-[20.5px] bg-gradient-to-b from-[#F4FAFD] to-[#E6F3FA]">
        <div className="card-shine" aria-hidden />
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-[#B8D8E8] bg-[#DCEEF8]/80 px-4 py-3">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#FF6B6B]" />
            <span className="h-3 w-3 rounded-full bg-[#FFC857]" />
            <span className="h-3 w-3 rounded-full bg-[#4FD1A1]" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-[#B8D8E8] bg-white/80 px-3 py-1 text-[11px] font-medium text-[#357A8A]">
            <FileCode2 className="h-3.5 w-3.5" />
            about-me.ts
          </div>
          <span className="w-12" aria-hidden />
        </div>

        {/* Code */}
        <div
          className="min-h-[318px] px-3 py-4 font-mono text-[12.5px] leading-[1.75] sm:px-4 sm:text-[13px]"
          aria-label="Code sample describing Arooba Alam Khan"
        >
          {rendered}
          {count === 0 && <Cursor />}
        </div>

        {/* Terminal strip */}
        <div className="border-t border-[#B8D8E8] bg-white/60 px-4 py-3 font-mono text-[12px] sm:text-[13px]">
          <div className="flex items-center gap-2 text-[#1F3A48]">
            <span className="font-bold text-[#4A90A4]">$</span>
            <span>
              {codeDone ? COMMAND.slice(0, cmdTyped) : ""}
              {codeDone && !finished && <Cursor />}
              {!codeDone && <span className="text-[#9DB6C2]">waiting for code…</span>}
            </span>
          </div>
          <div
            className={`mt-1.5 flex items-center gap-2 text-[#0F8A6D] transition-all duration-500 ${
              finished ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{OUTPUT}</span>
            {finished && <Cursor />}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────── */
const STAT_STYLES = [
  { icon: Briefcase, bg: "bg-gradient-to-br from-[#4A90A4] to-[#357A8A]" },
  { icon: Rocket, bg: "bg-gradient-to-br from-[#5B8DEF] to-[#3F63C9]" },
  { icon: HeartHandshake, bg: "bg-gradient-to-br from-[#3FBF9F] to-[#1F8F76]" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* ambient ice-blue background */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(184,216,232,0.55),transparent)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.18),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ── Left: story ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            <motion.p
              variants={item}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#357A8A] shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A90A4]" />
              About me
            </motion.p>

            <motion.h2
              variants={item}
              className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1F3A48] sm:text-5xl"
            >
              Engineering complete solutions, from concept to cloud
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-base leading-relaxed text-[#4A6B7A] sm:text-lg"
            >
              {PERSONAL_INFO.about}
            </motion.p>

            {/* Stats */}
            <motion.div variants={item} className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {PERSONAL_INFO.stats.map((s, i) => {
                const Icon = STAT_STYLES[i % STAT_STYLES.length].icon;
                return (
                  <div key={s.label} className="group glow-card [--glow-r:20px]">
                    <div className="relative z-[1] h-full overflow-hidden rounded-[18.5px] bg-gradient-to-b from-[#EAF6FC] to-[#DCEEF8] p-3 text-center sm:p-5">
                      <div className="card-shine" aria-hidden />
                      <span
                        className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110 ${STAT_STYLES[i % STAT_STYLES.length].bg}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      {/* nowrap + smaller size on phones: the gradient text only paints inside its own box, so "100%" must fit the card */}
                      <p className="font-display whitespace-nowrap bg-gradient-to-br from-[#1F3A48] to-[#4A90A4] bg-clip-text text-xl font-extrabold text-transparent min-[360px]:text-2xl min-[420px]:text-3xl sm:text-4xl">
                        <CountUp value={s.value} />
                      </p>
                      <p className="mt-1 text-[12px] font-medium leading-tight text-[#4A6B7A] sm:text-[13px]">
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Education */}
            <motion.div variants={item} className="mt-5">
              <div className="group glow-card [--glow-r:20px]">
                <div className="relative z-[1] flex items-center gap-4 overflow-hidden rounded-[18.5px] bg-gradient-to-r from-[#EAF6FC] via-[#E3F2FA] to-[#D4EAF6] p-4 sm:p-5">
                  <div className="card-shine" aria-hidden />
                  <div className="animate-float shrink-0 rounded-xl bg-gradient-to-br from-[#4A90A4] to-[#357A8A] p-3 text-white shadow-md shadow-[#4A90A4]/30 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-[#357A8A]">Education</p>
                    <p className="text-[15px] font-bold leading-snug text-[#1F3A48]">
                      {PERSONAL_INFO.education}
                    </p>
                  </div>
                  <span
                    className="ml-auto hidden h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#4FD1A1] sm:block"
                    aria-hidden
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: live code window ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <CodeWindow />
            <p className="mt-4 flex items-center justify-center gap-2 text-[12px] font-medium text-[#4A6B7A]">
              <Briefcase className="h-3.5 w-3.5 text-[#4A90A4]" />
              Open to freelance and contract work
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
