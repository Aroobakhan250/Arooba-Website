"use client";

import React from "react";
import { LazyMotion } from "framer-motion";

// Load the animation engine lazily (a separate, smaller chunk) instead of
// shipping the full framer-motion bundle with the first page load.
const loadFeatures = () =>
  import("@/components/motionFeatures").then((mod) => mod.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
