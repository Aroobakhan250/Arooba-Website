"use client";

import React, { useRef } from "react";
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
  MousePointer2,
} from "lucide-react";
import { m as motion, useReducedMotion } from "framer-motion";
import ScaleToFit from "@/components/ScaleToFit";
import "./services.css";

/* ─────────────────────────────────────────────────────────────
   Shared building blocks
   ───────────────────────────────────────────────────────────── */

type IconType = React.ComponentType<{ className?: string }>;

/**
 * One bento tile. `accent` is an "r, g, b" string; the tile's border, glow,
 * icon and chips are all tinted from it (see services.css). A spotlight
 * follows the cursor, and the tile lifts on hover.
 */
function Tile({
  accent,
  delay = 0,
  className = "",
  bodyClassName = "",
  children,
}: {
  accent: string;
  delay?: number;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // The grid is scaled by ScaleToFit, so convert screen pixels back to layout pixels.
    const k = r.width ? el.offsetWidth / r.width : 1;
    el.style.setProperty("--mx", `${(e.clientX - r.left) * k}px`);
    el.style.setProperty("--my", `${(e.clientY - r.top) * k}px`);
  };

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      style={{ "--accent": accent } as React.CSSProperties}
      className={`svc-tile group keep-original ${className}`}
    >
      <div className="svc-inner">
        <div className={`relative z-[1] flex min-w-0 flex-1 flex-col ${bodyClassName}`}>{children}</div>
      </div>
    </motion.div>
  );
}

function IconBubble({ icon: Icon, large = false }: { icon: IconType; large?: boolean }) {
  return (
    <span className={`svc-icon ${large ? "h-10 w-10" : "h-9 w-9"}`}>
      <Icon className="h-5 w-5 stroke-[2.2]" />
    </span>
  );
}

function Cta({ label = "Request", className = "text-xs" }: { label?: string; className?: string }) {
  return (
    <a href="#contact" className={`svc-cta ${className}`}>
      <span>{label}</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </a>
  );
}

function Typing({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex w-fit items-center gap-1 rounded-2xl border border-white/[0.08] bg-[#1F2F40] px-3.5 py-2.5 ${className}`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="svc-dot h-1.5 w-1.5 rounded-full bg-cyan-300"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Per-tile animated visuals
   ───────────────────────────────────────────────────────────── */

/** Chat conversation that plays out: message, typing dots, reply, typing dots, message. */
function ChatDemo() {
  return (
    <div className="svc-strip mt-4 space-y-2 p-3 font-sans text-xs">
      <div className="svc-b1 w-fit max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.08] bg-[#1F2F40] px-3.5 py-2 text-slate-200 shadow-sm">
        Hi! What are your delivery charges?
      </div>

      <div className="grid">
        <Typing className="svc-t1 col-start-1 row-start-1 justify-self-end rounded-tr-sm" />
        <div className="svc-b2 col-start-1 row-start-1 w-fit max-w-[85%] justify-self-end rounded-2xl rounded-tr-sm border border-cyan-400/40 bg-gradient-to-r from-teal-700 to-cyan-700 px-3.5 py-2 font-medium text-white shadow-[0_2px_12px_rgba(6,182,212,0.25)]">
          Free delivery above Rs. 3,000
        </div>
      </div>

      <div className="grid">
        <Typing className="svc-t2 col-start-1 row-start-1 rounded-tl-sm" />
        <div className="svc-b3 col-start-1 row-start-1 w-fit max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.08] bg-[#1F2F40] px-3.5 py-2 text-slate-200 shadow-sm">
          Thanks, can I track my order?
        </div>
      </div>
    </div>
  );
}

const BAR_HEIGHTS = [36, 64, 43, 86, 71];

/** Bars rise, then a trend line draws across their tops. */
function BarChart() {
  return (
    <div className="relative flex h-14 w-[74px] items-end gap-1.5">
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="svc-bar w-2.5 rounded-t-sm"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.12}s`,
            background: "linear-gradient(to top, rgba(var(--accent), 0.35), rgba(var(--accent), 1))",
            boxShadow: i === 3 ? "0 0 10px rgba(var(--accent), 0.55)" : undefined,
          }}
        />
      ))}
      <svg viewBox="0 0 74 56" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <path
          pathLength={1}
          d="M5 36 L21 20 L37 32 L53 8 L69 16"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.85"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svc-draw"
        />
      </svg>
    </div>
  );
}

/** A tiny browser that "loads" a page while a cursor moves over it. */
function BrowserDemo() {
  return (
    <div className="svc-strip mt-3 h-[68px] compact:h-14">
      <div className="svc-load absolute inset-x-0 top-0 h-0.5" style={{ background: "rgb(var(--accent))" }} />
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="ml-1 h-2 flex-1 rounded-full bg-white/10" />
      </div>
      <div className="flex gap-2 p-2">
        <div className="flex-1 space-y-1.5">
          <div className="svc-shimmer h-2 w-4/5 rounded" />
          <div className="svc-shimmer h-2 w-3/5 rounded" style={{ animationDelay: "0.3s" }} />
          <div className="h-2.5 w-9 rounded" style={{ background: "rgba(var(--accent), 0.85)" }} />
        </div>
        <div className="svc-shimmer h-9 w-14 rounded-md compact:w-10" style={{ animationDelay: "0.6s" }} />
      </div>
      <MousePointer2 className="svc-cursor absolute bottom-1.5 right-3 h-3.5 w-3.5 fill-white text-white drop-shadow" />
    </div>
  );
}

/** Orbiting rings and sparkles for the motion / 3D tile. */
function OrbitDemo() {
  return (
    <div className="svc-strip mt-3 flex h-[68px] items-center justify-center compact:h-14">
      <span className="svc-orbit-rev absolute h-14 w-14 rounded-full border border-dashed border-white/15 compact:h-11 compact:w-11">
        <span className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fuchsia-300" />
      </span>
      <span className="svc-orbit absolute h-9 w-9 rounded-full border border-white/20 compact:h-8 compact:w-8">
        <span
          className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{ background: "rgb(var(--accent))" }}
        />
      </span>
      <span className="relative h-4 w-4 rounded-full bg-gradient-to-br from-violet-300 to-fuchsia-400 shadow-[0_0_16px_rgba(192,132,252,0.9)]" />
      <Sparkles className="svc-twinkle absolute left-4 top-2 h-3 w-3 text-violet-200" />
      <Sparkles
        className="svc-twinkle absolute bottom-2 right-5 h-2.5 w-2.5 text-fuchsia-200"
        style={{ animationDelay: "1.2s" }}
      />
      <span className="svc-float absolute right-4 top-3 h-3 w-3 rotate-45 rounded-sm border border-violet-300/60 compact:right-2" />
    </div>
  );
}

/** Command types itself, then a success line appears. */
function TerminalDemo() {
  return (
    <div className="svc-strip mt-3 p-3 font-mono text-[11px] leading-relaxed compact:text-[10.5px]">
      <div className="mb-1.5 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
      </div>
      <div className="text-slate-300">
        <span className="svc-accent">$</span> <span className="svc-type">node sync-orders.js</span>
        <span className="svc-blink svc-accent">▍</span>
      </div>
      <div className="svc-late text-emerald-300">✓ 3 jobs scheduled · 1.2s</div>
    </div>
  );
}

const LAYERS = [
  { w: 80, bottom: 0, alpha: 0.55, delay: "0s" },
  { w: 68, bottom: 14, alpha: 0.4, delay: "0.25s" },
  { w: 56, bottom: 28, alpha: 0.28, delay: "0.5s" },
];

/** Stacked layers that gently breathe (multi-tenant platform). */
function LayersDemo() {
  return (
    <div className="svc-strip mt-3 flex h-[68px] items-center justify-center compact:h-14">
      <div className="relative h-[38px] w-20 compact:scale-90">
        {LAYERS.map((l) => (
          <span
            key={l.bottom}
            className="svc-layer absolute h-2.5 -skew-x-12 rounded-md"
            style={{
              width: l.w,
              // centred with `left`, not a translate: the animation owns the translate property
              left: `calc(50% - ${l.w / 2}px)`,
              bottom: l.bottom,
              animationDelay: l.delay,
              background: `rgba(var(--accent), ${l.alpha})`,
              border: "1px solid rgba(var(--accent), 0.7)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const DROPS = [
  { x: -14, delay: "0s", color: "bg-amber-300" },
  { x: 0, delay: "0.8s", color: "bg-rose-300" },
  { x: 14, delay: "1.6s", color: "bg-sky-300" },
];

/** Items drop into a cart whose counter pulses. */
function CartDemo() {
  return (
    <div className="svc-strip mt-3 flex h-[68px] items-center justify-center gap-5 compact:h-14">
      <div className="relative">
        {DROPS.map((d) => (
          <span
            key={d.x}
            className={`svc-drop absolute -top-1 h-2.5 w-2.5 rounded-sm ${d.color}`}
            style={{ left: `calc(50% + ${d.x}px - 5px)`, animationDelay: d.delay }}
          />
        ))}
        <ShoppingCart className="svc-accent relative h-8 w-8 stroke-[1.8]" />
        <span className="svc-pulse absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-slate-900">
          3
        </span>
      </div>
      <ul className="space-y-1 text-[10px] font-medium text-slate-400 compact:hidden">
        <li>✓ Cart</li>
        <li>✓ Payments</li>
        <li>✓ Inventory</li>
      </ul>
    </div>
  );
}

/* A* demo: the route lights up cell by cell. Indexes are row-major on a 12 x 6 grid. */
const PATH = [0, 1, 2, 14, 26, 38, 39, 40, 52, 64];
const WALLS = new Set([16, 19, 27, 29, 32, 41, 42, 53, 54, 65]);

function PathfindingGrid() {
  // flex-1 + grid-rows: the grid grows to fill whatever height the tile is stretched to.
  return (
    <div className="grid flex-1 grid-cols-12 grid-rows-6 gap-1.5 rounded-xl border border-white/[0.08] bg-[#0F1722]/80 p-2 compact:gap-1 compact:p-1.5">
      {Array.from({ length: 72 }, (_, i) => {
        const step = PATH.indexOf(i);
        const base = "min-h-[16px] rounded-sm";
        if (step === 0)
          return <div key={i} className={`${base} bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]`} />;
        if (step === PATH.length - 1)
          return <div key={i} className={`${base} bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]`} />;
        if (step > 0)
          return <div key={i} className={`${base} svc-path`} style={{ animationDelay: `${step * 0.28}s` }} />;
        return <div key={i} className={`${base} ${WALLS.has(i) ? "bg-[#0a0f16]" : "bg-[#131d27]"}`} />;
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section
   ───────────────────────────────────────────────────────────── */

export default function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="keep-original isolate relative overflow-hidden bg-[#09121B] pb-16 pt-14 md:pb-24 md:pt-20"
    >
      {/* Dark highlight band: hairlines, grid and soft colour glows */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[120px]"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <span className="mb-2.5 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
            Specialized Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hire a Developer Who{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Delivers
            </span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            I build complete, production-ready products on my own, so you get one person who understands your goals and takes full responsibility for the result.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <ScaleToFit designWidth={1100} compactWidth={540}>
          <div className="grid grid-cols-12 gap-3.5 sm:gap-4">
            {/* ═════ LEFT COLUMN ═════ */}
            <div className="col-span-6 flex flex-col gap-3.5 sm:gap-4">
              {/* AI chatbots (featured) */}
              <Tile accent="34, 211, 238" bodyClassName="p-5 sm:p-6 compact:p-3.5">
                <div className="mb-3.5 flex items-center justify-between">
                  <span className="svc-chip">
                    <span
                      className="svc-live h-1.5 w-1.5 rounded-full"
                      style={{ background: "rgb(var(--accent))" }}
                    />
                    Most requested
                  </span>
                  <Cta />
                </div>

                <IconBubble icon={Bot} large />
                <h3 className="mb-1.5 mt-3.5 text-base font-bold text-white sm:text-lg">
                  AI chatbots and virtual assistants
                </h3>
                <p className="text-[13px] leading-relaxed text-[#cbd5e1] sm:text-[13.5px]">
                  Custom chatbots trained on your business data using OpenAI / LLM APIs.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="svc-chip">OpenAI</span>
                  <span className="svc-chip">LLM APIs</span>
                  <span className="svc-chip">Knowledge base</span>
                </div>

                <ChatDemo />
              </Tile>

              {/* Websites + Animated sites */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                <Tile accent="96, 165, 250" delay={0.08} bodyClassName="p-4 sm:p-5 compact:p-3">
                  <IconBubble icon={Globe} />
                  <h3 className="mb-1 mt-3 text-sm font-bold text-white sm:text-base">Websites</h3>
                  <p className="text-[12.5px] leading-snug text-[#cbd5e1]">Fast, responsive, SEO</p>
                  <BrowserDemo />
                  <div className="mt-auto pt-3">
                    <Cta className="text-[11px]" />
                  </div>
                </Tile>

                <Tile accent="192, 132, 252" delay={0.12} bodyClassName="p-4 sm:p-5 compact:p-3">
                  <IconBubble icon={Sparkles} />
                  <h3 className="mb-1 mt-3 text-sm font-bold text-white sm:text-base">Animated sites</h3>
                  <p className="text-[12.5px] leading-snug text-[#cbd5e1]">3D, scroll, motion</p>
                  <OrbitDemo />
                  <div className="mt-auto pt-3">
                    <Cta className="text-[11px]" />
                  </div>
                </Tile>
              </div>

              {/* Custom software (stretches so both columns end level) */}
              <Tile accent="52, 211, 153" delay={0.16} className="flex-1" bodyClassName="p-4 sm:p-5 compact:p-3">
                <div className="flex items-center gap-3.5">
                  <IconBubble icon={Cpu} large />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white sm:text-base">Custom software and automation</h3>
                    <p className="mt-0.5 text-[12.5px] text-[#cbd5e1]">REST APIs, scrapers, management systems</p>
                  </div>
                </div>
                <TerminalDemo />
                <div className="mt-auto flex justify-end pt-3">
                  <Cta />
                </div>
              </Tile>
            </div>

            {/* ═════ RIGHT COLUMN ═════ */}
            <div className="col-span-6 flex flex-col gap-3.5 sm:gap-4">
              {/* Admin dashboards */}
              <Tile accent="56, 189, 248" delay={0.08} bodyClassName="p-5 sm:p-6 compact:p-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <IconBubble icon={LayoutDashboard} large />
                    <h3 className="mb-1 mt-3 text-base font-bold text-white sm:text-lg">
                      Admin dashboards and portals
                    </h3>
                    <p className="text-[13px] leading-relaxed text-[#cbd5e1] sm:text-[13.5px]">
                      Real-time analytics, roles, reports
                    </p>
                  </div>

                  <div className="shrink-0 pt-1">
                    <div className="mb-2 flex justify-end">
                      <span className="svc-chip">
                        <span className="svc-live h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Live
                      </span>
                    </div>
                    <BarChart />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 compact:hidden">
                  <span className="svc-chip">Role-based access</span>
                  <span className="svc-chip">PDF / Excel export</span>
                </div>

                <div className="mt-auto flex justify-end border-t border-white/[0.06] pt-2.5">
                  <Cta label="Request Service" />
                </div>
              </Tile>

              {/* SaaS + E-commerce */}
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                <Tile accent="129, 140, 248" delay={0.12} bodyClassName="p-4 sm:p-5 compact:p-3">
                  <IconBubble icon={Layers} />
                  <h3 className="mb-1 mt-3 text-sm font-bold text-white sm:text-base">SaaS platforms</h3>
                  <p className="text-[12.5px] leading-snug text-[#cbd5e1]">Billing, multi-tenant, APIs</p>
                  <LayersDemo />
                  <div className="mt-auto pt-3">
                    <Cta className="text-[11px]" />
                  </div>
                </Tile>

                <Tile accent="251, 191, 36" delay={0.16} bodyClassName="p-4 sm:p-5 compact:p-3">
                  <IconBubble icon={ShoppingCart} />
                  <h3 className="mb-1 mt-3 text-sm font-bold text-white sm:text-base">E-commerce</h3>
                  <p className="text-[12.5px] leading-snug text-[#cbd5e1]">Cart, payments, inventory</p>
                  <CartDemo />
                  <div className="mt-auto pt-3">
                    <Cta className="text-[11px]" />
                  </div>
                </Tile>
              </div>

              {/* Game apps (stretches so both columns end level) */}
              <Tile accent="45, 212, 191" delay={0.2} className="flex-1" bodyClassName="p-5 sm:p-6 compact:p-3.5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <IconBubble icon={Gamepad2} large />
                    <div>
                      <h3 className="text-base font-bold text-white sm:text-lg">Game apps and smart bots</h3>
                      <p className="text-[12.5px] text-[#cbd5e1]">A*, BFS/DFS pathfinding</p>
                    </div>
                  </div>
                  <Cta />
                </div>

                <PathfindingGrid />

                <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10.5px] font-medium text-slate-400">
                  <li className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-emerald-400" /> Start
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-teal-400" /> Shortest path
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-amber-400" /> Goal
                  </li>
                </ul>
              </Tile>
            </div>
          </div>
        </ScaleToFit>

        {/* ── Bottom consultation banner ── */}
        <Tile accent="34, 211, 238" delay={0.1} className="mt-12 sm:mt-14" bodyClassName="p-5 sm:p-7">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <IconBubble icon={MessageSquare} large />
              <div>
                <h4 className="text-base font-bold text-white sm:text-lg">
                  Don&apos;t see what you need? Let&apos;s discuss your project.
                </h4>
                <p className="mt-0.5 text-xs text-[#cbd5e1] sm:text-sm">
                  Custom architectural solutions tailored precisely to your company&apos;s workflows.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="svc-btn inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-xs font-bold tracking-wide text-slate-950 shadow-[0_4px_18px_rgba(6,182,212,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-teal-400 hover:shadow-[0_6px_22px_rgba(6,182,212,0.5)] sm:text-sm"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </a>
          </div>
        </Tile>
      </div>
    </section>
  );
}
