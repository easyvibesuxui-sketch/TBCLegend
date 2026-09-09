"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PLATES } from "@/lib/plates";
import { asset } from "@/lib/asset";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import HoldPuck from "@/components/ui/HoldPuck";

/**
 * The reach: a hand entering from the left and the molten seal drawing back
 * from it, moved by the puck rather than by scroll.
 *
 * This is why the two plates were drawn separately on bare paper: a single
 * flat illustration of the same moment could not be taken apart like this.
 *
 * The rest of the set composites under `mix-blend-multiply`, but that only
 * drops the paper out while the plate's paper is at least as light as the
 * ground — and measured, these come back warm and slightly dark, leaving a
 * visible rectangle. These two move over each other and over whatever ground
 * the section uses, so they carry a real alpha channel instead; see
 * scripts/unmix-layer.py.
 */
export default function GesturePlate() {
  const reduced = usePrefersReducedMotion();

  // The puck writes here; the spring is what the layers actually follow, so a
  // released puck carries the drawing home instead of snapping it.
  const raw = useMotionValue(0);
  const p = useSpring(raw, { stiffness: 180, damping: 26, mass: 0.6 });

  // The hand crosses most of the gap; the seal gives ground more slowly, so
  // the distance closes without the two ever meeting.
  const handX = useTransform(p, [0, 1], ["0%", "46%"]);
  const sealX = useTransform(p, [0, 1], ["0%", "14%"]);
  const sealScale = useTransform(p, [0, 1], [1, 0.84]);
  const sealTilt = useTransform(p, [0, 1], [0, 9]);

  const onProgress = useCallback(
    (next: number) => {
      // Reduced motion keeps the plate at rest: the beat still reads as a
      // drawing, it simply does not chase the pointer.
      if (!reduced) raw.set(next);
    },
    [raw, reduced],
  );

  return (
    <div className="relative w-full">
      <div className="relative aspect-[2/1] w-full overflow-hidden border border-ink bg-paper-bright">
        {/* The seal, recoiling */}
        <motion.img
          src={asset(PLATES.seal.image)}
          alt={PLATES.seal.label}
          style={{ x: sealX, scale: sealScale, rotate: sealTilt }}
          className="absolute right-[11%] top-[54%] w-[38%] -translate-y-1/2"
        />

        {/* The hand, reaching in from the frame edge */}
        <motion.img
          src={asset(PLATES.hand.image)}
          alt={PLATES.hand.label}
          style={{ x: handX }}
          className="absolute left-[-4%] top-[54%] w-[56%] -translate-y-1/2"
        />
      </div>

      <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label max-w-[34ch] text-ink/55">
          ხელი უახლოვდება — საგანძური იხევს
        </p>
        <HoldPuck
          lines={["დაიჭირე", "და გასწიე"]}
          onProgress={onProgress}
          className="shrink-0"
        />
      </div>
    </div>
  );
}
