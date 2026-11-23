"use client";

import React from "react";

const TICKER_ITEMS = [
  "Full-Stack Development",
  "AI Systems & LLMs",
  "Dashboard Architecture",
  "Next.js Engineering",
  "SaaS Platforms",
  "Python & OpenCV",
  "REST APIs & GraphQL",
  "React & TypeScript",
];

export default function InfiniteTicker() {
  return (
    <div className="w-full bg-[#1C2836] border-y border-[#C8D9E6]/15 py-4 overflow-hidden relative z-20">
      <div className="animate-ticker flex items-center space-x-10 text-white font-black text-xs sm:text-sm uppercase tracking-widest select-none">
        {/* Render multiple times for seamless loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-8 shrink-0">
            <span className="hover:text-[#C8D9E6] transition-colors">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#567C8D] inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
