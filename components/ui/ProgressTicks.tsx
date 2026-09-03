"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** The small vertical tick indicator pinned to the bottom-right of every frame. */
export default function ProgressTicks() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const h = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 right-5 z-40 flex items-end gap-[3px] mix-blend-difference sm:bottom-7 sm:right-7"
    >
      {[10, 16, 22].map((height) => (
        <span key={height} className="block w-[2px] bg-paper" style={{ height }} />
      ))}
      <span className="relative ml-1 block h-[22px] w-[2px] bg-paper/30">
        <motion.span
          style={{ height: h }}
          className="absolute inset-x-0 top-0 block bg-paper"
        />
      </span>
    </div>
  );
}
