"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, MessagesSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/data/portfolioData";

const TONES = [
  {
    grad: "from-[#4A90A4] to-[#357A8A]",
    text: "text-[#2A7F96]",
    soft: "bg-[#4A90A4]/12 border-[#4A90A4]/30",
    g1: "#4a90a4",
    g2: "#9ad4e6",
    bar: "bg-gradient-to-r from-[#4A90A4] to-[#7BB8C8]",
  },
  {
    grad: "from-[#5B8DEF] to-[#3F63C9]",
    text: "text-[#3F63C9]",
    soft: "bg-[#5B8DEF]/12 border-[#5B8DEF]/30",
    g1: "#5b8def",
    g2: "#a9c4ff",
    bar: "bg-gradient-to-r from-[#5B8DEF] to-[#A9C4FF]",
  },
  {
    grad: "from-[#8B6FE0] to-[#6A4FC4]",
    text: "text-[#6A4FC4]",
    soft: "bg-[#8B6FE0]/12 border-[#8B6FE0]/30",
    g1: "#8b6fe0",
    g2: "#c9b8ff",
    bar: "bg-gradient-to-r from-[#8B6FE0] to-[#C9B8FF]",
  },
];

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const total = TESTIMONIALS_DATA.length;

  const go = (i: number) => {
    setDir(i > idx || (idx === total - 1 && i === 0) ? 1 : -1);
    setIdx((i + total) % total);
  };

  const current = TESTIMONIALS_DATA[idx];
  const tone = TONES[idx % TONES.length];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden pb-14 pt-8 md:pb-16 md:pt-10"
    >
      <div className="pointer-events-none absolute -right-28 top-10 -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(184,216,232,0.55),transparent)]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.16),transparent)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#357A8A] shadow-sm">
            <MessagesSquare className="h-3.5 w-3.5" />
            Client testimonials
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1F3A48] sm:text-5xl">
            What clients say about working with me
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4A6B7A] sm:text-lg">
            Feedback from freelance platforms and direct contracts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* ── Featured testimonial ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group glow-card lg:col-span-8 [--glow-r:26px]"
            style={{ "--g1": tone.g1, "--g2": tone.g2 } as React.CSSProperties}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative z-[1] flex h-full min-h-[340px] flex-col overflow-hidden rounded-[24.5px] bg-gradient-to-br from-[#F4FAFD] via-[#EAF6FC] to-[#DCEEF8] p-6 sm:p-9">
              <div className="card-shine" aria-hidden />

              <Quote
                className={`pointer-events-none absolute right-6 top-6 h-24 w-24 opacity-[0.09] ${tone.text}`}
                aria-hidden
              />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={current.id}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -30 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-1 flex-col"
                >
                  <span
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md ${tone.grad}`}
                  >
                    <Quote className="h-5 w-5 fill-white" />
                  </span>

                  <div className="mb-4 flex items-center gap-1" aria-label={`${current.rating} out of 5 stars`}>
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -40 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      </motion.span>
                    ))}
                  </div>

                  <p className="relative z-10 flex-1 text-lg font-medium leading-relaxed text-[#1F3A48] sm:text-xl">
                    &ldquo;{current.review}&rdquo;
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#4A90A4]/20 pt-6">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-lg font-bold text-white shadow-md ${tone.grad}`}
                      >
                        {current.clientName.charAt(0)}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-[#1F3A48] sm:text-lg">
                          {current.clientName}
                        </h3>
                        <p className="mt-0.5 text-[13px] text-[#4A6B7A]">
                          {current.role} &middot;{" "}
                          <span className={`font-semibold ${tone.text}`}>
                            {current.companyOrPlatform}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => go(idx - 1)}
                        aria-label="Previous testimonial"
                        className="cursor-pointer rounded-xl border border-[#4A90A4]/25 bg-white p-2.5 text-[#1F3A48] transition-all duration-200 hover:-translate-x-0.5 hover:border-[#4A90A4] hover:bg-[#4A90A4] hover:text-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => go(idx + 1)}
                        aria-label="Next testimonial"
                        className="cursor-pointer rounded-xl border border-[#4A90A4]/25 bg-white p-2.5 text-[#1F3A48] transition-all duration-200 hover:translate-x-0.5 hover:border-[#4A90A4] hover:bg-[#4A90A4] hover:text-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Auto-advance progress (also drives the timer) */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#B8D8E8]/50" aria-hidden>
                <div
                  key={`${idx}`}
                  className={`progress-fill h-full ${tone.bar}`}
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                  onAnimationEnd={() => go(idx + 1)}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Selector cards ── */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
            {TESTIMONIALS_DATA.map((t, i) => {
              const tn = TONES[i % TONES.length];
              const active = i === idx;
              return (
                <motion.button
                  key={t.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonial from ${t.clientName}`}
                  aria-pressed={active}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group glow-card cursor-pointer text-left [--glow-r:20px]"
                  style={{ "--g1": tn.g1, "--g2": tn.g2 } as React.CSSProperties}
                >
                  <div
                    className={`relative z-[1] flex h-full items-center gap-3.5 overflow-hidden rounded-[18.5px] p-4 transition-colors duration-300 ${
                      active
                        ? "bg-gradient-to-r from-white to-[#EAF6FC]"
                        : "bg-gradient-to-b from-[#EAF6FC] to-[#DCEEF8]"
                    }`}
                  >
                    <div className="card-shine" aria-hidden />
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-display text-base font-bold text-white shadow-md transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110 ${tn.grad}`}
                    >
                      {t.clientName.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-[14px] font-bold text-[#1F3A48]">
                        {t.clientName}
                      </p>
                      <p className="truncate text-[12px] text-[#4A6B7A]">
                        {t.role}
                      </p>
                      <span
                        className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[10.5px] font-semibold ${tn.soft} ${tn.text}`}
                      >
                        {t.companyOrPlatform}
                      </span>
                    </div>
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${
                        active ? `scale-100 bg-gradient-to-br ${tn.grad}` : "scale-50 bg-[#B8D8E8]"
                      }`}
                      aria-hidden
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
