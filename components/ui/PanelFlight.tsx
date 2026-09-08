"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A panel that travels toward the reader.
 *
 * In the reference a panel does not simply scroll into view: it sits low on
 * the paper page as a visible **trapezoid** — narrower at the top, wider at
 * the bottom — and as the reader scrolls it grows and its edges straighten
 * until it squares up with the frame. It reads as a card flying at the camera,
 * and it is the single mechanic that makes the page feel like moving through a
 * comic rather than scrolling past one.
 *
 * Scrubbed, not played, because the reference stops dead when scrolling stops.
 */
export default function PanelFlight({
  children,
  /** Starting tilt in degrees — the trapezoid's severity */
  from = 15,
  /** Starting scale */
  scale = 0.74,
  className = "",
}: {
  children: ReactNode;
  from?: number;
  scale?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    // Fifteen degrees of panel swinging toward the reader is exactly the kind
    // of motion the preference exists to refuse. The CSS rule cannot catch it,
    // because GSAP writes the transform directly.
    if (reduced) return;

    const ctx = gsap.context(() => {
      const el = inner.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { rotateX: from, scale, y: 70, opacity: 0.35 },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: outer.current,
            // Begins as the panel appears from below and completes once it has
            // settled into the upper third — the arrival point, not the exit.
            start: "top bottom",
            end: "top 32%",
            scrub: 0.6,
          },
        },
      );
    }, outer);

    return () => ctx.revert();
  }, [from, scale, reduced]);

  return (
    <div
      ref={outer}
      className={className}
      style={{ perspective: 1400, perspectiveOrigin: "50% 40%" }}
    >
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
