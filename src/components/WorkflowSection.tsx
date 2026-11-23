"use client";

import React from "react";
import { WORKFLOW_STEPS, type StepItem } from "@/data/portfolioData";
import {
  Compass,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import ScaleToFit from "@/components/ScaleToFit";

const STEP_STYLES = [
  {
    icon: Compass,
    grad: "from-[#4A90A4] to-[#357A8A]",
    text: "text-[#2A7F96]",
    soft: "bg-[#4A90A4]/12 border-[#4A90A4]/30",
    g1: "#4a90a4",
    g2: "#9ad4e6",
    output: "Scope & roadmap",
  },
  {
    icon: PenTool,
    grad: "from-[#5B8DEF] to-[#3F63C9]",
    text: "text-[#3F63C9]",
    soft: "bg-[#5B8DEF]/12 border-[#5B8DEF]/30",
    g1: "#5b8def",
    g2: "#a9c4ff",
    output: "Approved designs",
  },
  {
    icon: Code2,
    grad: "from-[#8B6FE0] to-[#6A4FC4]",
    text: "text-[#6A4FC4]",
    soft: "bg-[#8B6FE0]/12 border-[#8B6FE0]/30",
    g1: "#8b6fe0",
    g2: "#c9b8ff",
    output: "Working build",
  },
  {
    icon: ShieldCheck,
    grad: "from-[#F2A33A] to-[#D9841A]",
    text: "text-[#B96C0E]",
    soft: "bg-[#F2A33A]/15 border-[#F2A33A]/35",
    g1: "#f2a33a",
    g2: "#ffd9a0",
    output: "Tested release",
  },
  {
    icon: Rocket,
    grad: "from-[#3FBF9F] to-[#1F8F76]",
    text: "text-[#1F8F76]",
    soft: "bg-[#3FBF9F]/12 border-[#3FBF9F]/30",
    g1: "#3fbf9f",
    g2: "#9be8d2",
    output: "Live & supported",
  },
];

export default function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="relative overflow-hidden pb-14 pt-8 md:pb-16 md:pt-10"
    >
      <div className="pointer-events-none absolute -left-28 top-16 -z-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(184,216,232,0.55),transparent)]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(74,144,164,0.16),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A90A4]/25 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#357A8A] shadow-sm">
            <RefreshCcw className="h-3.5 w-3.5" />
            Development lifecycle
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1F3A48] sm:text-5xl">
            A clear 5-step process
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4A6B7A] sm:text-lg">
            A transparent roadmap from requirements to testing, deployment and
            ongoing support, so you always know what happens next.
          </p>
        </motion.div>

        <ScaleToFit designWidth={1100}>
        {/* Timeline rail */}
        <div className="relative mb-6" aria-hidden>
          <div className="absolute left-[10%] right-[10%] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#B8D8E8]/70" />
          <motion.div
            className="absolute left-[10%] right-[10%] top-1/2 h-[3px] origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4A90A4] via-[#8B6FE0] to-[#3FBF9F]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <div className="relative grid grid-cols-5">
            {WORKFLOW_STEPS.map((step: StepItem, i: number) => (
              <div key={step.number} className="flex justify-center">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: 0.25 + i * 0.3, type: "spring", stiffness: 260, damping: 18 }}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-extrabold text-white shadow-lg ring-4 ring-[#F5FBFF] ${STEP_STYLES[i % 5].grad}`}
                >
                  {step.number}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-5 gap-5">
          {WORKFLOW_STEPS.map((step: StepItem, index: number) => {
            const s = STEP_STYLES[index % STEP_STYLES.length];
            const Icon = s.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group glow-card [--glow-r:22px]"
                style={{ "--g1": s.g1, "--g2": s.g2 } as React.CSSProperties}
              >
                <div className="relative z-[1] flex h-full flex-col overflow-hidden rounded-[20.5px] bg-gradient-to-b from-[#EAF6FC] to-[#DCEEF8] p-5">
                  <div className="card-shine" aria-hidden />

                  {/* big faint step number */}
                  <span
                    className={`pointer-events-none absolute -right-1 -top-3 select-none font-display text-[84px] font-extrabold leading-none opacity-[0.09] ${s.text}`}
                    aria-hidden
                  >
                    {step.number}
                  </span>

                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110 ${s.grad}`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${s.soft} ${s.text}`}
                    >
                      Phase {index + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-[17px] font-bold leading-snug text-[#1F3A48]">
                    {step.title}
                  </h3>
                  <p className="mb-5 mt-2 text-[13px] leading-relaxed text-[#4A6B7A]">
                    {step.description}
                  </p>

                  <div className="mt-auto flex items-center gap-1.5 border-t border-[#4A90A4]/20 pt-3 text-[12px] font-semibold text-[#1F3A48]">
                    <CheckCircle2 className={`h-4 w-4 ${s.text}`} />
                    {s.output}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        </ScaleToFit>
      </div>
    </section>
  );
}
