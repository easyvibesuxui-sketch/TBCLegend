"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import TiltFrame from "@/components/ui/TiltFrame";

/**
 * A panel that arrives and then takes the screen.
 *
 * Read from the reference recording: a bordered card sits low in the frame,
 * grows as the reader scrolls, and its border passes the viewport edges — at
 * which point it stops being a panel on paper and becomes the whole screen,
 * with the scene playing there. The paper page returns after.
 *
 * Two structural notes, both learned the hard way:
 *
 * The stage is sticky, so a transformed ancestor would make itself the
 * containing block and stop it sticking at all. The tilt therefore lives
 * *inside* the stage rather than around it, the same arrangement Hero uses.
 *
 * The captions are children of the stage but not of the tilt. They belong to
 * the frame, not to the artwork: they hold their corners while the picture
 * moves underneath, which is what the recording shows and what pinning them to
 * the panel would lose.
 */
export default function PanelTakeover({
  children,
  captions = [],
  ground = "#6E2020",
  scrollLength = "260vh",
  className = "",
  ...rest
}: {
  children: ReactNode;
  /** Held in a viewport corner for a slice of the scroll, not attached to the art */
  captions?: {
    node: ReactNode;
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    /** Progress window this caption is visible across, 0 → 1 */
    at: [number, number];
  }[];
  ground?: string;
  scrollLength?: string;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  /*
   * Every duration below is stated rather than left to a default, because the
   * default made the growth eat the whole stuck range: measured, the card only
   * reached full-bleed at the exact moment the stage released, so the
   * full-bleed hold the recording shows lasted no scroll at all.
   *
   * GROW + HOLD is the timeline, and the timeline is the stuck range, so these
   * read directly as the fraction of the hold each phase gets.
   */
  const GROW = 0.55;
  const HOLD = 0.45;
  const TOTAL = GROW + HOLD;

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // The card grows until its border leaves the frame. The inset is what
      // travels; the border simply thins to nothing as it goes, so there is no
      // moment where a hairline sits half off-screen.
      const card = cardRef.current;
      if (!card) return;
      tl.fromTo(
        card,
        { top: "22%", bottom: "22%", left: "20%", right: "20%", borderWidth: 1 },
        {
          top: "0%",
          bottom: "0%",
          left: "0%",
          right: "0%",
          borderWidth: 0,
          ease: "none",
          duration: GROW,
        },
        0,
      )
        // A shallow lean that straightens as it arrives, so it reads as a card
        // travelling toward the reader rather than a box being resized.
        .fromTo(
          card,
          { rotateX: 9 },
          { rotateX: 0, ease: "none", duration: GROW },
          0,
        );

      // Hold once arrived: the back half of the stuck range is the scene
      // playing full-bleed, with nothing moving but the artwork itself.
      tl.to({}, { duration: HOLD }, GROW);

      /*
        Captions ride the same timeline rather than carrying ScrollTriggers of
        their own. A trigger's `top+=X%` is a percentage of the trigger
        element's height, but the stage only stays stuck for as long as that
        height exceeds one viewport — here 1440 of 2340px, or 61%. Windows
        written as fractions of the height therefore ran past the point where
        the stage had already scrolled away, and the second caption never
        appeared. The timeline spans exactly the stuck range, so a position on
        it means what it says.
      */
      captions.forEach((c, i) => {
        const el = outer.current?.querySelector(`[data-cap="${i}"]`);
        if (!el) return;
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            duration: Math.max(0.05, (c.at[1] - c.at[0]) * TOTAL),
          },
          c.at[0] * TOTAL,
        );
      });
    }, outer);

    return () => ctx.revert();
  }, [reduced, captions.length]);

  const CORNER = {
    "top-left": "left-4 top-20 sm:left-10 sm:top-24",
    "top-right": "right-4 top-20 sm:right-10 sm:top-24",
    "bottom-left": "bottom-8 left-4 sm:bottom-14 sm:left-10",
    "bottom-right": "bottom-8 right-4 sm:bottom-14 sm:right-10",
  } as const;

  return (
    <div
      ref={outer}
      className={`relative ${className}`}
      style={{ height: reduced ? undefined : scrollLength }}
      {...rest}
    >
      <div
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
        style={{ background: ground, perspective: 1600 }}
      >
        {/*
          The card sits outside the tilt, with the tilt inside it. TiltFrame
          renders a different element depending on whether the tilt is enabled,
          and that is decided in an effect — so a card *inside* it is mounted
          once, captured by this component's layout effect, then thrown away
          and rebuilt when the tilt switches on, leaving the timeline animating
          a detached node. Measured: the captions, which live outside the tilt,
          animated while the card never moved.

          Keeping the card out here also reads better: the frame holds still
          and the artwork leans within it, rather than the border leaning too.
        */}
        <div
          ref={cardRef}
          className="absolute overflow-hidden border-ink"
          style={{
            // The rest is written by the timeline; these are the values a
            // reader with reduced motion keeps, which is the arrived state.
            inset: 0,
            borderStyle: "solid",
            borderWidth: 0,
          }}
        >
          <TiltFrame fill>{children}</TiltFrame>
        </div>

        {captions.map((c, i) => (
          <div
            key={i}
            data-cap={i}
            className={`pointer-events-none absolute z-20 max-w-[min(86vw,30rem)] ${CORNER[c.corner]}`}
            style={reduced ? undefined : { visibility: "hidden" }}
          >
            {c.node}
          </div>
        ))}
      </div>
    </div>
  );
}
