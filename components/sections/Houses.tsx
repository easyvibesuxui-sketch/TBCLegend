"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { HOUSES } from "@/lib/houses";
import ArtPlate from "@/components/ui/ArtPlate";
import Panel from "@/components/ui/Panel";
import TornEdge from "@/components/ui/TornEdge";
import { EASE } from "@/lib/motion";

/**
 * The four houses as a plate spread: one tall panel each, flooded in its own
 * spot colour, with the name struck across the bottom. Hovering lifts the
 * plate and pulls its description up from behind the name.
 */
export default function Houses() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Alternate columns rise at different rates so the row never reads as a
      // flat grid of cards.
      gsap.utils.toArray<HTMLElement>("[data-house]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: i % 2 === 0 ? 5 : -3 },
          {
            yPercent: i % 2 === 0 ? -5 : 3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="houses"
      className="grain-paper relative bg-paper px-4 py-28 sm:px-8 sm:py-40"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center font-display text-[clamp(2.2rem,7.5vw,6.5rem)] leading-[0.88] text-ink"
        >
          <span className="block">ოთხი სახლი</span>
          <span className="block">ერთი საგანძური</span>
        </motion.h2>

        <div className="mt-6 flex items-center justify-center gap-6">
          <span className="label text-signal">თითოეულს თავისი სიმართლე</span>
        </div>

        <div className="mt-16 grid gap-5 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {HOUSES.map((house, i) => (
            <motion.div
              key={house.id}
              data-house
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 }}
              className="group"
            >
              <Panel className="aspect-[3/4.6] w-full transition-transform duration-500 group-hover:-translate-y-2">
                <ArtPlate label={house.plate} tone={house.tone} />

                {/* Name plate, struck across the foot of the panel */}
                <div className="absolute inset-x-0 bottom-0 z-10 border-t border-ink bg-paper-bright">
                  <div className="px-4 py-4">
                    <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-none text-ink">
                      {house.name}
                    </h3>
                    <p className="label mt-2 text-ink/45">{house.latin}</p>
                  </div>

                  {/*
                    Description unfurls on hover on pointer devices and is
                    simply always open on touch, where hover never fires.
                  */}
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="border-t border-ink/15 px-4 py-4">
                        <p className="font-display text-[13px] text-signal">
                          „{house.motto}“
                        </p>
                        <p className="mt-3 font-body text-[12.5px] leading-[1.75] text-ink/70">
                          {house.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
        <TornEdge color="#CF2A20" side="bottom" seed={21} />
      </div>
    </section>
  );
}
