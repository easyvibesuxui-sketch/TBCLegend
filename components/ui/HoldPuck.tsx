"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * The site's signature gesture affordance: a white puck labelled with two
 * lines of bold uppercase text, sitting beside the thing it acts on.
 *
 * Press and drag it and `onProgress` reports 0 → 1 across `travel` pixels, so
 * a section can scrub artwork from the drag instead of from scroll. Releasing
 * springs it home.
 */
export default function HoldPuck({
  lines,
  travel = 190,
  axis = "x",
  onProgress,
  className = "",
}: {
  lines: [string, string];
  travel?: number;
  axis?: "x" | "y";
  onProgress?: (p: number) => void;
  className?: string;
}) {
  const [held, setHeld] = useState(false);
  const raw = useMotionValue(0);
  const pos = useSpring(raw, { stiffness: 260, damping: 26, mass: 0.5 });
  const start = useRef(0);

  const report = (v: number) => {
    raw.set(v);
    onProgress?.(Math.min(1, Math.abs(v) / travel));
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    start.current = axis === "x" ? e.clientX : e.clientY;
    setHeld(true);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!held) return;
    const now = axis === "x" ? e.clientX : e.clientY;
    const d = now - start.current;
    report(Math.max(-travel, Math.min(travel, d)));
  };

  const onUp = () => {
    setHeld(false);
    report(0);
  };

  return (
    <motion.div
      role="slider"
      aria-label={`${lines[0]} ${lines[1]}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      tabIndex={0}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{ [axis]: pos } as never}
      className={`z-30 flex h-[92px] w-[92px] cursor-grab touch-none select-none items-center justify-center rounded-full border border-ink bg-paper-bright text-center active:cursor-grabbing ${
        held ? "" : "animate-puckPulse"
      } ${className}`}
    >
      <span className="label leading-[1.35]">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    </motion.div>
  );
}
