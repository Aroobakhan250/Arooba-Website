"use client";

import React from "react";
import Image from "next/image";
import { Settings, Terminal, Wrench, type LucideIcon } from "lucide-react";
import { TECH_LOGOS } from "@/data/techLogos";
import "./heroRobot.css";

/**
 * Centre visual of the hero: a robot image with tools, APIs and technology logos
 * circling around it. Sizes use container units (cqw) so the whole scene scales
 * with the frame, including the compact phone layout.
 */

/* ── orbit contents ── */
type InnerItem = { kind: "icon"; Icon: LucideIcon } | { kind: "text"; text: string };

const INNER: InnerItem[] = [
  { kind: "icon", Icon: Wrench },
  { kind: "text", text: "API" },
  { kind: "icon", Icon: Settings },
  { kind: "icon", Icon: Terminal },
];

const OUTER = ["React.js", "Next.js", "Python", "Node.js", "OpenAI API", "TypeScript"];

const R_OUTER = 40; // cqw
const R_INNER = 29; // cqw
const T_OUTER = 10; // tile size, cqw
const T_INNER = 8.2;

function OrbitTile({
  angle,
  radius,
  size,
  back,
  dur,
  children,
  className,
}: {
  angle: number;
  radius: number;
  size: number;
  back: boolean;
  dur: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className="absolute left-0 top-0"
      style={{
        width: `${size}cqw`,
        height: `${size}cqw`,
        marginLeft: `${-size / 2}cqw`,
        marginTop: `${-size / 2}cqw`,
        transform: `rotate(${angle}deg) translateY(${-radius}cqw) rotate(${-angle}deg)`,
      }}
    >
      {/* counter-rotation keeps the tile upright while the ring turns */}
      <div
        className={`${back ? "rb-fwd" : "rb-back"} flex h-full w-full items-center justify-center ${className}`}
        style={{ "--dur": dur } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

export default function HeroRobot() {
  return (
    <div className="keep-original relative h-full w-full overflow-hidden rounded-[27px] bg-[#0c141d] [container-type:size]">
      {/* robot image (full bleed) */}
      <Image
        src="/hero-robot.jpg"
        alt="Futuristic robot interacting with a holographic interface"
        fill
        priority
        quality={80}
        sizes="(max-width: 768px) 300px, 360px"
        className="object-cover object-[50%_20%]"
      />

      {/* tint + fades so the badge, orbit and caption stay readable */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,18,27,0.55)_0%,rgba(9,18,27,0.05)_28%,rgba(9,18,27,0.1)_55%,rgba(9,18,27,0.92)_100%)]" />
      <div className="pointer-events-none absolute -left-10 top-10 h-48 w-48 rounded-full bg-cyan-500/20 blur-[70px]" />
      <div className="pointer-events-none absolute -right-10 bottom-16 h-48 w-48 rounded-full bg-violet-500/25 blur-[70px]" />

      {/* availability badge */}
      <div className="absolute left-3.5 top-3.5 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 shadow-md backdrop-blur compact:left-1.5 compact:top-1.5 compact:gap-1 compact:px-1.5 compact:py-0.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <span className="text-[11px] font-semibold text-white compact:text-[9.5px]">Open for projects</span>
      </div>

      {/* scene anchor: the point everything orbits around */}
      <div className="absolute left-1/2 top-[44%]">
        {/* orbit guide rings */}
        <div
          className="absolute rounded-full border border-dashed border-cyan-200/35"
          style={{ width: `${R_OUTER * 2}cqw`, height: `${R_OUTER * 2}cqw`, left: `${-R_OUTER}cqw`, top: `${-R_OUTER}cqw` }}
        />
        <div
          className="absolute rounded-full border border-cyan-200/25"
          style={{ width: `${R_INNER * 2}cqw`, height: `${R_INNER * 2}cqw`, left: `${-R_INNER}cqw`, top: `${-R_INNER}cqw` }}
        />

        {/* inner ring: tools and API (turns one way) */}
        <div className="rb-fwd absolute left-0 top-0 h-0 w-0" style={{ "--dur": "16s" } as React.CSSProperties}>
          {INNER.map((it, i) => (
            <OrbitTile
              key={i}
              angle={i * 90 + 45}
              radius={R_INNER}
              size={T_INNER}
              back={false}
              dur="16s"
              className="rounded-[28%] border border-cyan-400/50 bg-[#0e1d2b]/90 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.45)] backdrop-blur-sm"
            >
              {it.kind === "icon" ? (
                <it.Icon className="h-[56%] w-[56%]" strokeWidth={2.2} />
              ) : (
                <span className="font-extrabold leading-none" style={{ fontSize: "2.7cqw" }}>
                  {it.text}
                </span>
              )}
            </OrbitTile>
          ))}
        </div>

        {/* outer ring: technology logos (turns the other way) */}
        <div className="rb-back absolute left-0 top-0 h-0 w-0" style={{ "--dur": "28s" } as React.CSSProperties}>
          {OUTER.map((name, i) => {
            const logo = TECH_LOGOS[name]?.[0];
            if (!logo) return null;
            return (
              <OrbitTile
                key={name}
                angle={i * 60}
                radius={R_OUTER}
                size={T_OUTER}
                back
                dur="28s"
                className="rounded-[28%] border border-white/25 bg-white shadow-[0_10px_22px_-8px_rgba(0,0,0,0.7)]"
              >
                <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill={logo.color} aria-hidden>
                  <path d={logo.path} />
                </svg>
              </OrbitTile>
            );
          })}
        </div>
      </div>

      {/* caption */}
      <div className="absolute inset-x-0 bottom-[9%] z-10 px-6 text-center compact:hidden">
        <p className="font-display text-[15px] font-bold text-white drop-shadow">Tools, APIs &amp; AI</p>
        <p className="mt-0.5 text-[11.5px] text-slate-200 drop-shadow">working together for your product</p>
      </div>
    </div>
  );
}
