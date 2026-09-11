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
    /*
      Both layers centre themselves through the motion `y`, never through a
      `-translate-y-1/2` class. Framer writes the whole `transform` inline to
      drive `x`, and an inline transform beats the class outright — so the
      class was silently dropped and both drawings hung *downward* from their
      54% top, landing in the bottom corner with the frame empty above them.
      Keeping the centring inside the same transform is the only way the two
      compose.

      They also sit closer together than they did. Pinned to the frame edges
      the beat read as two objects in separate corners rather than one reach.
    */
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink bg-paper-bright sm:aspect-[2/1]">
      {/* The seal, recoiling */}
      <motion.img
        src={asset(PLATES.seal.image)}
        alt={PLATES.seal.label}
        style={{ x: sealX, y: "-50%", scale: sealScale, rotate: sealTilt }}
        className="absolute right-[14%] top-1/2 w-[32%]"
      />

      {/* The hand, reaching in toward it */}
      <motion.img
        src={asset(PLATES.hand.image)}
        alt={PLATES.hand.label}
        style={{ x: handX, y: "-50%" }}
        className="absolute left-[6%] top-1/2 w-[44%]"
      />

      {/*
        The puck sits on the plate rather than under it: it is the handle for
        this drawing, and parked outside the frame it read as a caption's
        companion instead of a control. The instruction it carried in prose
        underneath is gone — the puck already says "hold and pull".
      */}
      <HoldPuck
        lines={["დაიჭირე", "და გასწიე"]}
        onProgress={onProgress}
        /*
          At its default 92px the puck covered the seal outright on a phone —
          half the height of a 2:1 frame 358px wide. Below sm the frame takes
          a 4:3 ratio and the puck a smaller diameter, which together leave
          the drawings their own band across the middle and the puck a clear
          strip beneath, with neither overlapping the other.
        */
        sizeClass="h-[68px] w-[68px] sm:h-[92px] sm:w-[92px]"
        className="absolute bottom-3 right-3 z-10 sm:bottom-6 sm:right-6"
      />
    </div>
  );
}
