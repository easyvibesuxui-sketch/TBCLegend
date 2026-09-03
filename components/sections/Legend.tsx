"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { LEGEND_CHAPTERS } from "@/lib/houses";
import { EASE } from "@/lib/motion";
import Placeholder from "@/components/ui/Placeholder";
import SectionLabel from "@/components/ui/SectionLabel";
import Starfield from "@/components/ui/Starfield";

export default function Legend() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background drifts slower than the page — the parallax bed.
      gsap.to("[data-legend-bg]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]");

      chapters.forEach((chapter, i) => {
        const lines = chapter.querySelectorAll("[data-reveal]");

        // Reveal: lift, unblur, settle — staggered down the block.
        gsap.fromTo(
          lines,
          { y: 46, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: chapter,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Whichever chapter owns the middle of the viewport drives the art.
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeChapter = LEGEND_CHAPTERS[active];

  return (
    <section
      ref={sectionRef}
      id="legend"
      className="relative bg-abyss-950 py-28 sm:py-40"
    >
      {/*
        Parallax bed. The clipping lives here rather than on <section>, because
        an `overflow: hidden` ancestor would disable the sticky art column.
      */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div data-legend-bg className="absolute inset-x-0 -top-1/4 h-[150%]">
          <div
            className="absolute inset-0 transition-[background] duration-1000"
            style={{
              background: `radial-gradient(90% 55% at 22% 30%, ${activeChapter.hue}1F 0%, transparent 62%), radial-gradient(70% 50% at 82% 78%, rgba(110,139,255,0.10) 0%, transparent 60%)`,
            }}
          />
          <Starfield count={70} seed={23} />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <SectionLabel>ლეგენდა</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mx-auto mt-7 max-w-[22ch] text-center font-display text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.05] text-gold-50"
        >
          როგორ დაიმსხვრა{" "}
          <span className="text-gilded">უძველესი საგანძური</span>
        </motion.h2>

        <div className="mt-20 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-16">
          {/* ── Sticky art column ───────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[18vh]">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChapter.id}
                    initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
                    transition={{ duration: 0.85, ease: EASE }}
                  >
                    <Placeholder
                      label={activeChapter.placeholder}
                      hue={activeChapter.hue}
                      ratio="aspect-[4/5]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Chapter rail */}
                <div className="mt-8 flex items-center gap-5">
                  {LEGEND_CHAPTERS.map((c, i) => (
                    <div key={c.id} className="flex items-center gap-3">
                      <span
                        className={`font-display text-sm transition-colors duration-500 ${
                          i === active ? "text-gold-200" : "text-gold-100/25"
                        }`}
                      >
                        {c.index}
                      </span>
                      <span className="relative block h-px w-10 bg-gold-100/15 sm:w-14">
                        <motion.span
                          className="absolute inset-y-0 left-0 bg-gold-300"
                          initial={false}
                          animate={{ width: i <= active ? "100%" : "0%" }}
                          transition={{ duration: 0.7, ease: EASE }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Story column ────────────────────────────────── */}
          <div className="lg:col-span-7">
            {LEGEND_CHAPTERS.map((chapter) => (
              <article
                key={chapter.id}
                data-chapter
                className="flex min-h-[68vh] flex-col justify-center border-t border-gold-300/10 py-14 first:border-t-0 lg:min-h-[86vh] lg:py-20"
              >
                <div
                  data-reveal
                  className="flex items-center gap-4 will-change-transform"
                >
                  <span
                    className="font-display text-xs tracking-[0.3em]"
                    style={{ color: chapter.hue }}
                  >
                    {chapter.index}
                  </span>
                  <span className="font-display text-[11px] tracking-[0.18em] text-gold-100/55 sm:text-xs">
                    {chapter.kicker}
                  </span>
                </div>

                <h3
                  data-reveal
                  className="mt-6 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.1] text-gold-50 will-change-transform"
                >
                  {chapter.title}
                </h3>

                <p
                  data-reveal
                  className="mt-6 max-w-[58ch] font-body text-[15px] leading-[1.9] text-gold-50/60 will-change-transform sm:text-[17px]"
                >
                  {chapter.body}
                </p>

                <span
                  data-reveal
                  className="mt-9 block h-px w-24 will-change-transform"
                  style={{
                    background: `linear-gradient(90deg, ${chapter.hue}, transparent)`,
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
