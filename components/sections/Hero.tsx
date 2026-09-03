"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import ArtPlate from "@/components/ui/ArtPlate";
import { EASE } from "@/lib/motion";

/**
 * The cover of the book: a flooded night plate, the title struck over it, and
 * the paper tearing in at the bottom to introduce the story.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrub = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            onUpdate: (self) => {
              scrub.current = self.progress;
            },
          },
        })
        // The title rises out of frame as the tear swallows the cover.
        .to("[data-hero-title]", { yPercent: -34, ease: "none" }, 0)
        .to("[data-hero-meta]", { opacity: 0, ease: "none" }, 0)
        .to("[data-hero-plate]", { scale: 1.14, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[210vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        <div data-hero-plate className="absolute inset-0">
          <ArtPlate
            tone="night"
            scrub={scrub}
            labelAlign="bottom"
            label="[Video: ღამის ცა, მელნის ღრუბლები — საგანძური ჯერ მთელია]"
          />
        </div>

        {/* Title */}
        <div className="relative z-10 flex h-[100svh] flex-col items-center justify-center px-6">
          <motion.h1
            data-hero-title
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            className="text-center font-display text-[clamp(2.9rem,10.5vw,9.5rem)] leading-[0.86] text-paper"
          >
            <span className="sr-only">საგანძურის მარათონი</span>
            <span aria-hidden className="block">
              საგანძურის
            </span>
            <span aria-hidden className="block">
              მარათონი
            </span>
          </motion.h1>

          <motion.p
            data-hero-meta
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            className="label mt-10 text-paper/70"
          >
            TBC · ოთხი სახლის ამბავი
          </motion.p>
        </div>
      </div>
    </section>
  );
}
