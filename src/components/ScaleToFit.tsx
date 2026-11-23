"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

/**
 * Renders its children at a fixed "design width" (the desktop layout) and
 * scales the whole block to fit the screen, so the layout looks the same on
 * every device.
 *
 * On small screens (container narrower than `compactBelow`) it switches to a
 * narrower `compactWidth` design and sets `data-compact` on the wrapper, which
 * enables the `compact:` Tailwind variant so cards can show a leaner layout
 * with larger text. Without `compactWidth` it just scales the desktop design.
 */
export default function ScaleToFit({
  designWidth,
  compactWidth,
  compactBelow = 600,
  fluid = false,
  children,
  className = "",
}: {
  designWidth: number;
  compactWidth?: number;
  compactBelow?: number;
  /** Above `compactBelow`, skip scaling and let the content use the real width (normal responsive layout). */
  fluid?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [s, setS] = useState({
    scale: 1,
    left: 0,
    height: 0,
    width: designWidth,
    compact: false,
    ready: false,
  });

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const w = outer.clientWidth;
      const compact = compactWidth !== undefined && w < compactBelow;
      if (fluid && !compact) {
        setS({ scale: 1, left: 0, height: inner.offsetHeight, width: w, compact: false, ready: true });
        return;
      }
      const dw = compact ? (compactWidth as number) : designWidth;
      // Compact designs may scale up a little so they fill phone-sized screens.
      const scale = Math.min(compact ? 1.3 : 1, w / dw);
      const left = Math.max(0, (w - dw * scale) / 2);
      setS({
        scale,
        left,
        height: inner.offsetHeight * scale,
        width: dw,
        compact,
        ready: true,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [designWidth, compactWidth, compactBelow, fluid]);

  return (
    <div
      ref={outerRef}
      className={`relative w-full ${className}`}
      style={{ height: s.ready ? s.height : undefined }}
    >
      <div
        ref={innerRef}
        data-compact={s.compact ? "true" : undefined}
        style={{
          width: s.width,
          transform: `translateX(${s.left}px) scale(${s.scale})`,
          transformOrigin: "top left",
          visibility: s.ready ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
