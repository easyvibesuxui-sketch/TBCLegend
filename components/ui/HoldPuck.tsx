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
 *
 * It has two states, read from the reference recording: idle it is the
 * labelled circle, and the moment it is grabbed it collapses to a small plain
 * dot that leads the illustration. The label would be under the reader's own
 * finger during the drag, so it goes; what is left is the smallest mark that
 * still says where the gesture is.
 */
export default function HoldPuck({
  lines,
  travel = 190,
  axis = "x",
  onProgress,
  /**
   * The puck's diameter, as Tailwind classes. It *replaces* the default
   * rather than being appended to it: two competing `h-`/`w-` utilities in
   * one class list are resolved by their order in the stylesheet, not in the
   * attribute, so appending an override is a coin flip.
   */
  sizeClass = "h-[92px] w-[92px]",
  className = "",
}: {
  lines: [string, string];
  travel?: number;
  axis?: "x" | "y";
  onProgress?: (p: number) => void;
  sizeClass?: string;
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
      animate={held ? "held" : "idle"}
      variants={{
        /*
         * The idle pulse lives here rather than in the CSS keyframe it used to
         * use. A CSS animation overrides inline styles, so the two would fight
         * over `transform` on release: the pulse would win the instant the
         * class came back and snap the dot to full size mid-spring.
         */
        idle: {
          scale: [1, 1.06, 1],
          opacity: [1, 0.92, 1],
          transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
        },
        // Small enough to read as a point of contact rather than a shrunken
        // button, which is what the recording shows.
        held: {
          scale: 0.24,
          transition: { type: "spring", stiffness: 420, damping: 32 },
        },
      }}
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
      /*
        `animate-puckPulse` used to ride along here. It was left behind when
        the pulse moved into the variants above, and a CSS animation overrides
        inline styles — so while idle the keyframe's `transform: scale()` was
        still overwriting the very transform the drag writes. The variants own
        the pulse, opacity included; the class is gone.
      */
      className={`z-30 flex ${sizeClass} cursor-grab touch-none select-none items-center justify-center rounded-full border border-ink bg-paper-bright text-center active:cursor-grabbing ${className}`}
    >
      {/*
        The label scales up as its parent scales down, so it would stay the
        same size on screen while the puck shrank underneath it. Countering the
        scale keeps it inside the dot as it collapses, and it fades before that
        becomes visible.
      */}
      <motion.span
        /*
          The label carries its own size rather than taking `.label`'s 11px:
          on the smaller puck the gesture frame uses at phone width, two
          tracked uppercase words at 11px simply do not fit inside a 68px
          circle and spilled over its border. Utilities outrank the component
          layer `.label` sits in, so these win without an !important.
        */
        className="label text-[8.5px] leading-[1.3] tracking-[0.06em] sm:text-[13px] sm:leading-[1.35] sm:tracking-label"
        variants={{
          idle: { opacity: 1, scale: 1 },
          held: { opacity: 0, scale: 0.5 },
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        {lines[0]}
        <br />
        {lines[1]}
      </motion.span>
    </motion.div>
  );
}
