"use client";

import React from "react";
import {
  Globe,
  Bot,
  LayoutDashboard,
  Layers,
  ShoppingCart,
  Sparkles,
  Gamepad2,
  Cpu,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="pt-10 pb-16 md:pt-14 md:pb-20 relative overflow-hidden">
      {/* Top subtle separator divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4A90A4]/25 to-transparent" />

      {/* Alternating soft section backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8F4FA]/60 to-transparent pointer-events-none -z-10" />

      {/* Subtle background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="w-[85vw] max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(74,144,164,0.08)_0%,rgba(74,144,164,0.03)_40%,transparent_70%)] blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <span className="glass-pill text-[11px] uppercase tracking-widest font-bold text-[#4A90A4] px-3.5 py-1 rounded-full inline-block mb-2.5 border-[#4A90A4]/30">
            Specialized Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C4A5A] tracking-tight">
            Hire a Developer Who Delivers
          </h2>
          <p className="mt-3 text-[#4A6B7A] text-sm sm:text-base leading-relaxed">
            I build complete, production-ready products on my own, so you get one person who understands your goals and takes full responsibility for the result.
          </p>
        </motion.div>

        {/* ── Bento Grid matching sample image layout precisely ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4">
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN (lg:col-span-6): AI Chatbots + Websites + Animated + Custom Software
             ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-4">
            {/* Tile 1: AI Chatbots & Virtual Assistants (Tall card with chat bubbles) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative rounded-2xl p-5 sm:p-6 bg-white/80 backdrop-blur-md border border-[#4A90A4]/30 shadow-[0_4px_20px_rgba(74,144,164,0.12)] hover:border-[#4A90A4] hover:shadow-[0_8px_28px_rgba(74,144,164,0.22)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Badge */}
              <div className="mb-3.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full bg-[#4A90A4]/15 border border-[#4A90A4]/30 text-[#4A90A4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A90A4] animate-pulse" />
                  Most requested
                </span>

                <a
                  href="#contact"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3.5 shadow-sm group-hover:brightness-125 transition-all">
                <Bot className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                AI chatbots and virtual assistants
              </h3>
              <p className="text-[13px] sm:text-[13.5px] text-[#cbd5e1] leading-relaxed mb-4">
                Custom chatbots trained on your business data using OpenAI / LLM APIs.
              </p>

              {/* Interactive Chat Bubbles Mockup */}
              <div className="space-y-2 pt-1 font-sans text-xs">
                {/* Bubble 1: Incoming */}
                <div className="w-fit max-w-[85%] px-3.5 py-2 rounded-2xl rounded-tl-sm bg-[#1F2F40] border border-white/[0.08] text-slate-200 shadow-sm">
                  Hi! What are your delivery charges?
                </div>

                {/* Bubble 2: Outgoing Bot Reply */}
                <div className="flex justify-end">
                  <div className="w-fit max-w-[85%] px-3.5 py-2 rounded-2xl rounded-tr-sm bg-gradient-to-r from-teal-700 to-cyan-700 border border-cyan-400/40 text-white font-medium shadow-[0_2px_12px_rgba(6,182,212,0.2)]">
                    Free delivery above Rs. 3,000
                  </div>
                </div>

                {/* Bubble 3: Incoming Follow-up */}
                <div className="w-fit max-w-[85%] px-3.5 py-2 rounded-2xl rounded-tl-sm bg-[#1F2F40] border border-white/[0.08] text-slate-200 shadow-sm">
                  Thanks, can I track my order?
                </div>
              </div>
            </motion.div>

            {/* Split Row: Websites (col-1) + Animated sites (col-2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Tile 2: Websites */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="group relative rounded-2xl p-4 sm:p-5 bg-[#16222F]/80 backdrop-blur-md border border-[#C8D9E6]/20 hover:border-cyan-400/50 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[145px]"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 shadow-sm group-hover:brightness-125 transition-all">
                    <Globe className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    Websites
                  </h3>
                  <p className="text-[12.5px] text-[#cbd5e1] leading-snug">
                    Fast, responsive, SEO
                  </p>
                </div>

                <a
                  href="#contact"
                  className="mt-3 text-[11px] font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Tile 3: Animated sites */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="group relative rounded-2xl p-4 sm:p-5 bg-[#16222F]/80 backdrop-blur-md border border-[#C8D9E6]/20 hover:border-cyan-400/50 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[145px]"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 shadow-sm group-hover:brightness-125 transition-all">
                    <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    Animated sites
                  </h3>
                  <p className="text-[12.5px] text-[#cbd5e1] leading-snug">
                    3D, scroll, motion
                  </p>
                </div>

                <a
                  href="#contact"
                  className="mt-3 text-[11px] font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Tile 4: Custom software and automation (Wide bottom tile) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="group relative rounded-2xl p-4 sm:p-5 bg-[#16222F]/80 backdrop-blur-md border border-[#C8D9E6]/20 hover:border-cyan-400/50 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-sm shrink-0 group-hover:brightness-125 transition-all">
                  <Cpu className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Custom software and automation
                  </h3>
                  <p className="text-[12.5px] text-[#cbd5e1] mt-0.5">
                    REST APIs, scrapers, management systems
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="shrink-0 text-xs font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
              >
                <span>Request</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN (lg:col-span-6): Admin Dashboards + (SaaS & E-commerce) + Game Apps
             ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-4">
            {/* Tile 5: Admin dashboards and portals (Wide card with vertical bar chart) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="group relative rounded-2xl p-5 sm:p-6 bg-[#16222F]/90 backdrop-blur-md border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.14)] hover:border-cyan-300 hover:shadow-[0_0_28px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[145px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 shadow-sm group-hover:brightness-125 transition-all">
                    <LayoutDashboard className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    Admin dashboards and portals
                  </h3>
                  <p className="text-[13px] sm:text-[13.5px] text-[#cbd5e1] leading-relaxed">
                    Real-time analytics, roles, reports
                  </p>
                </div>

                {/* Vertical Bar Chart Graphic (Matching sample mockup exactly) */}
                <div className="flex items-end gap-1.5 h-14 shrink-0 pt-2">
                  <div className="w-2.5 h-5 rounded-t-sm bg-cyan-500/70 group-hover:bg-cyan-400 transition-colors" />
                  <div className="w-2.5 h-9 rounded-t-sm bg-cyan-500/80 group-hover:bg-cyan-400 transition-colors" />
                  <div className="w-2.5 h-6 rounded-t-sm bg-cyan-500/70 group-hover:bg-cyan-400 transition-colors" />
                  <div className="w-2.5 h-12 rounded-t-sm bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
                  <div className="w-2.5 h-10 rounded-t-sm bg-cyan-500/85 group-hover:bg-cyan-400 transition-colors" />
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex justify-end">
                <a
                  href="#contact"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Split Row: SaaS platforms + E-commerce */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Tile 6: SaaS platforms */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="group relative rounded-2xl p-4 sm:p-5 bg-[#16222F]/90 backdrop-blur-md border border-cyan-400/40 shadow-[0_0_16px_rgba(6,182,212,0.12)] hover:border-cyan-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[145px]"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 shadow-sm group-hover:brightness-125 transition-all">
                    <Layers className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    SaaS platforms
                  </h3>
                  <p className="text-[12.5px] text-[#cbd5e1] leading-snug">
                    Billing, multi-tenant, APIs
                  </p>
                </div>

                <a
                  href="#contact"
                  className="mt-3 text-[11px] font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Tile 7: E-commerce */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="group relative rounded-2xl p-4 sm:p-5 bg-[#16222F]/80 backdrop-blur-md border border-[#C8D9E6]/20 hover:border-cyan-400/50 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[145px]"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 shadow-sm group-hover:brightness-125 transition-all">
                    <ShoppingCart className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    E-commerce
                  </h3>
                  <p className="text-[12.5px] text-[#cbd5e1] leading-snug">
                    Cart, payments, inventory
                  </p>
                </div>

                <a
                  href="#contact"
                  className="mt-3 text-[11px] font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Tile 8: Game apps and smart bots (with Grid/Pathfinding matrix mockup) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group relative rounded-2xl p-5 sm:p-6 bg-[#16222F]/90 backdrop-blur-md border border-[#C8D9E6]/20 hover:border-cyan-400/50 hover:shadow-[0_8px_24px_rgba(6,182,212,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-sm group-hover:brightness-125 transition-all">
                      <Gamepad2 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Game apps and smart bots
                      </h3>
                      <p className="text-[12.5px] text-[#cbd5e1]">
                        A*, BFS/DFS pathfinding
                      </p>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1 group/btn"
                  >
                    <span>Request</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* 2D Pathfinding Algorithmic Matrix (Exact match from the sample image) */}
                <div className="mt-4 pt-2">
                  <div className="grid grid-cols-12 gap-1.5 p-2 rounded-xl bg-[#0F1722]/80 border border-white/[0.08]">
                    {/* Row 1 */}
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />

                    {/* Row 2 */}
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#0a0f16]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />

                    {/* Row 3 */}
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-[#0a0f16]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />

                    {/* Row 4 */}
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    <div className="h-4.5 rounded-sm bg-[#0a0f16]" />
                    <div className="h-4.5 rounded-sm bg-[#0a0f16]" />
                    <div className="h-4.5 rounded-sm bg-[#0a0f16]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                    <div className="h-4.5 rounded-sm bg-[#131d27]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Consultation Banner ── */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            delay: prefersReducedMotion ? 0 : 0.15,
          }}
          className="mt-12 sm:mt-14 rounded-2xl p-5 sm:p-7 bg-[#16222F]/90 backdrop-blur-md border border-cyan-400/30 shadow-[0_0_24px_rgba(6,182,212,0.1)] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#1b3a4b] to-[#0f4c5c] border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
              <MessageSquare className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Don&apos;t see what you need? Let&apos;s discuss your project.
              </h4>
              <p className="text-xs sm:text-sm text-[#cbd5e1] mt-0.5">
                Custom architectural solutions tailored precisely to your company&apos;s workflows.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_18px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_22px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Get a Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
