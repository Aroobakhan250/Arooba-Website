"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

/**
 * Renders its children at a fixed "design width" (the desktop layout) and
 * scales the whole block down to fit narrower screens, so the layout looks the
 * same on every device. It never scales up; on wide screens it is centred.
 */
export default function ScaleToFit({
  designWidth,
  children,
  className = "",
}: {
  designWidth: number;
  children: React.ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scale: 1, left: 0, height: 0, ready: false });

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const w = outer.clientWidth;
      const scale = Math.min(1, w / designWidth);
      const left = Math.max(0, (w - designWidth * scale) / 2);
      setState({ scale, left, height: inner.offsetHeight * scale, ready: true });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={outerRef}
      className={`relative w-full ${className}`}
      style={{ height: state.ready ? state.height : undefined }}
    >
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          transform: `translateX(${state.left}px) scale(${state.scale})`,
          transformOrigin: "top left",
          visibility: state.ready ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
