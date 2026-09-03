"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { charReveal, EASE } from "@/lib/motion";
import CoinField from "@/components/ui/CoinField";
import Starfield from "@/components/ui/Starfield";
import ScrollCue from "@/components/ui/ScrollCue";

const TITLE = "საგანძურის მარათონი";

/** Splits the headline into per-character spans while keeping words unbroken. */
function SplitTitle() {
  let charIndex = 0;
  return (
    <h1 className="font-display text-[clamp(3rem,11.5vw,10rem)] font-medium leading-[0.95] tracking-[-0.02em]">
      <span className="sr-only">{TITLE}</span>
      <span aria-hidden className="flex flex-wrap justify-center gap-x-[0.28em]">
        {TITLE.split(" ").map((word, w) => (
          <span key={w} className="inline-flex">
            {Array.from(word).map((char) => {
              const i = charIndex++;
              return (
                // Mask → intro reveal → scroll-driven shatter, one layer each.
                <span
                  key={`${char}-${i}`}
                  data-hero-mask
                  className="inline-block overflow-hidden pb-[0.14em]"
                >
                  <motion.span
                    className="inline-block"
                    variants={charReveal}
                    custom={i}
                    initial="hidden"
                    animate="show"
                  >
                    <span
                      data-hero-char
                      className="text-gilded inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-hero-char]");
      const masks = gsap.utils.toArray<HTMLElement>("[data-hero-mask]");

      // The masks exist only for the intro's slide-up. Once the glyphs have
      // landed they must stop clipping, or the shatter flies into a hard box.
      let unclipped = false;
      const unclip = () => {
        if (unclipped) return;
        unclipped = true;
        gsap.set(masks, { overflow: "visible" });
      };
      const introDone = gsap.delayedCall(2.1, unclip);

      // Master scrub: one timeline, driven entirely by scroll distance.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            // Feed the canvas without re-rendering React.
            progress.current = self.progress;
            if (self.progress > 0) unclip();
          },
        },
      });

      // The headline shatters: each glyph flies on its own vector.
      tl.to(
        chars,
        {
          y: () => gsap.utils.random(-260, 320),
          x: () => gsap.utils.random(-320, 320),
          rotate: () => gsap.utils.random(-75, 75),
          scale: () => gsap.utils.random(0.4, 1.35),
          filter: "blur(14px)",
          opacity: 0,
          ease: "power2.in",
          stagger: { each: 0.012, from: "center" },
        },
        0,
      );

      tl.to("[data-hero-fade]", { opacity: 0, y: -40, ease: "none" }, 0);

      // Layered parallax on the background plates.
      tl.to("[data-parallax='far']", { yPercent: -8, ease: "none" }, 0)
        .to("[data-parallax='mid']", { yPercent: -20, ease: "none" }, 0)
        .to("[data-parallax='near']", { yPercent: -42, ease: "none" }, 0)
        .to("[data-hero-veil]", { opacity: 1, ease: "none" }, 0.15);

      // A slow push-in makes the whole stage feel cinematic.
      tl.fromTo(
        stageRef.current,
        { scale: 1 },
        { scale: 1.12, ease: "none" },
        0,
      );
      return () => introDone.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      /* Tall scroll track: the sticky stage plays the shatter across it. */
      className="relative h-[240vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={stageRef} className="absolute inset-0 will-change-transform">
          {/* ── Background plates ────────────────────────────── */}
          <div
            data-parallax="far"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 8%, #121A31 0%, #05070F 55%, #03040A 100%)",
            }}
          />
          <Starfield count={110} seed={11} />

          <div
            data-parallax="mid"
            className="absolute inset-x-0 bottom-0 h-[70%]"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 78%, rgba(217,172,70,0.22) 0%, transparent 70%)",
            }}
          />

          {/* Distant ridge — two stacked silhouettes for depth */}
          <div
            data-parallax="mid"
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[34%] opacity-70"
            style={{
              background:
                "linear-gradient(to top, #0C1122 0%, rgba(12,17,34,0.35) 100%)",
              clipPath:
                "polygon(0% 100%, 0% 58%, 8% 47%, 15% 60%, 24% 40%, 33% 57%, 41% 34%, 50% 55%, 58% 41%, 67% 59%, 76% 45%, 85% 60%, 93% 49%, 100% 57%, 100% 100%)",
            }}
          />
          <div
            data-parallax="near"
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[26%]"
            style={{
              background:
                "linear-gradient(to top, #03040A 30%, rgba(3,4,10,0.92) 100%)",
              clipPath:
                "polygon(0% 100%, 0% 64%, 11% 52%, 21% 70%, 31% 46%, 42% 66%, 52% 44%, 62% 68%, 72% 50%, 83% 69%, 92% 55%, 100% 66%, 100% 100%)",
            }}
          />
          {/* Horizon haze softens the ridge line into the sky */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[38%]"
            style={{
              background:
                "linear-gradient(to top, rgba(3,4,10,0.9) 0%, transparent 100%)",
            }}
          />

          {/* ── The shattering treasure ──────────────────────── */}
          <div className="absolute inset-0">
            {/* The hoard rests on the horizon, then shatters upward */}
            <CoinField
              progress={progress}
              count={190}
              originY={0.86}
              shape="band"
            />
          </div>

          {/* ── Copy ─────────────────────────────────────────── */}
          <div className="relative z-10 flex h-[100svh] flex-col items-center justify-center px-6 text-center">
            <motion.div
              data-hero-fade
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="mb-6 flex items-center gap-4 sm:mb-9"
            >
              <span className="rule-gold h-px w-8 sm:w-14" />
              <span className="font-body text-[9px] uppercase tracking-widest2 text-gold-300/85 sm:text-[11px]">
                TBC · ლეგენდა იწყება
              </span>
              <span className="rule-gold h-px w-8 sm:w-14" />
            </motion.div>

            <SplitTitle />

            <motion.p
              data-hero-fade
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.15 }}
              className="mt-8 max-w-[52ch] font-body text-sm leading-relaxed text-gold-50/60 sm:mt-10 sm:text-base"
            >
              მილიონობით ოქროს მონეტა სამეფოს ოთხივე კუთხეში მიმოიფანტა.
              ოთხი დიდი საგვარეულო მათ საძებნელად გაემართა.
            </motion.p>

            {/* Corner-set so it never collides with the coin band */}
            <div
              data-hero-fade
              className="absolute bottom-8 left-6 sm:bottom-12 lg:left-10"
            >
              <ScrollCue label="გადაახვიე" />
            </div>
          </div>

          {/* Veil that hands the viewer over to the legend */}
          <div
            data-hero-veil
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-abyss-950/60 to-abyss-950 opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
