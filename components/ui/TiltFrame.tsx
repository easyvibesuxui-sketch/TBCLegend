"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTilt } from "@/components/TiltProvider";

/**
 * Leans a section toward the cursor by a few degrees.
 *
 * The rotation deliberately is not applied to the document: at ~8000px tall,
 * three degrees about its centre would throw the far ends hundreds of pixels
 * sideways. Each section tilts instead, and its transform-origin tracks
 * whatever is at the centre of the viewport, so the pivot sits where the
 * reader is actually looking and tall sections behave like short ones.
 */
export default function TiltFrame({
  children,
  max = 3.5,
  fill = false,
  className = "",
}: {
  children: ReactNode;
  /** Peak rotation in degrees at the viewport edges */
  max?: number;
  /**
   * Stretch to the parent's height. Needed wherever the tilt sits inside a
   * fixed-height stage, since the transformed element becomes the containing
   * block for any absolutely positioned children.
   */
  fill?: boolean;
  className?: string;
}) {
  const tilt = useTilt();
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  // Matches the direction the house cards already lean, so the page and its
  // components agree rather than fighting each other.
  const spring = { stiffness: 90, damping: 22, mass: 0.7 };
  // Hooks cannot be conditional, so keep a pair of parked values to read from
  // when the provider is absent or the tilt is switched off.
  const parkedX = useMotionValue(0);
  const parkedY = useMotionValue(0);
  const srcX = tilt?.x ?? parkedX;
  const srcY = tilt?.y ?? parkedY;

  const rotateY = useSpring(
    useTransform(srcX, (v) => v * 2 * max),
    spring,
  );
  const rotateX = useSpring(
    useTransform(srcY, (v) => -v * 2 * max),
    spring,
  );

  useEffect(() => {
    const el = outer.current;
    const target = inner.current;
    if (!el || !target || !tilt?.enabled) return;

    let raf = 0;
    let visible = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(el);

    const tick = () => {
      if (visible) {
        const r = el.getBoundingClientRect();
        // Pivot on the point of this section sitting at the viewport centre,
        // clamped so a section leaving the frame does not swing on a hinge
        // far outside itself.
        const centre = window.innerHeight / 2 - r.top;
        const originY = Math.max(0, Math.min(r.height, centre));
        target.style.transformOrigin = `50% ${originY}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [tilt?.enabled]);

  const size = fill ? "h-full w-full" : "";

  if (!tilt?.enabled)
    return <div className={`${size} ${className}`}>{children}</div>;

  return (
    <div
      ref={outer}
      className={`${size} ${className}`}
      style={{
        perspective: 1800,
        transformStyle: "preserve-3d",
        // A few degrees of lean reaches past the viewport edge. `clip` cuts it
        // without creating a scroll container, which `hidden` would — and a
        // scroll container is exactly what kills position: sticky.
        overflowX: "clip",
      }}
    >
      <motion.div
        ref={inner}
        className={size}
        style={{
          rotateX,
          rotateY,
          // A few degrees opens a sliver at the edges; a hair of scale closes
          // it without reading as a zoom.
          scale: 1.035,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
