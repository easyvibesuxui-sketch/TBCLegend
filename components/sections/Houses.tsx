"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { HOUSES } from "@/lib/houses";
import { EASE } from "@/lib/motion";
import HouseCard from "@/components/ui/HouseCard";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Houses() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the viewport and translate the rail sideways.
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Progress rail under the cards.
        gsap.fromTo(
          "[data-houses-progress]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.4}`,
              scrub: true,
            },
          },
        );
      });

      // Mobile keeps a plain vertical stack — cards reveal themselves.
      mm.add("(max-width: 1023px)", () => {
        gsap.set(trackRef.current, { clearProps: "transform" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="houses"
      className="relative overflow-hidden bg-abyss-900 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 45% at 50% 0%, rgba(217,172,70,0.14) 0%, transparent 60%), linear-gradient(#03040A, #05070F 40%, #080B18 100%)",
        }}
      />

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <SectionLabel>ოთხი საგვარეულო</SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="mx-auto mt-7 max-w-[18ch] text-center font-display text-[clamp(2rem,5.5vw,4.5rem)] font-medium leading-[1.05] text-gold-50"
          >
            თითოეულ სახლს აქვს <span className="text-gilded">თავისი სიმართლე</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="mx-auto mt-6 max-w-[46ch] text-center font-body text-sm leading-relaxed text-gold-50/55 sm:text-base"
          >
            აირჩიე საგვარეულო და გაეცანი მათ ხასიათს, დევიზსა და სამეფოს
            მომავლის ხედვას.
          </motion.p>
        </div>

        {/* ── Rail: pinned + horizontal on desktop, stacked on mobile ── */}
        <div
          ref={pinRef}
          className="mt-16 lg:mt-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex flex-col gap-8 px-6 will-change-transform lg:flex-row lg:gap-10 lg:px-[max(2.5rem,8vw)]"
          >
            {HOUSES.map((house, i) => (
              <HouseCard key={house.id} house={house} index={i} />
            ))}

            {/* Tail card: closes the rail and points to the quiz */}
            <div className="hidden w-[clamp(280px,20vw,340px)] shrink-0 flex-col justify-center lg:flex">
              <span className="rule-gold mb-6 block h-px w-16" />
              <p className="font-display text-2xl leading-snug text-gold-100/80">
                შენ რომელ
                <br />
                სახლს ეკუთვნი?
              </p>
              <a
                href="#quiz"
                className="mt-6 inline-flex w-fit items-center gap-2 font-display text-xs tracking-[0.14em] text-gold-300 transition-colors hover:text-gold-100 sm:text-[13px]"
              >
                გაიგე ქვიზით
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Horizontal-scroll progress rail, pinned alongside the cards */}
          <div className="mx-auto mt-12 hidden h-px w-[min(38rem,60vw)] bg-gold-100/10 lg:block">
            <span
              data-houses-progress
              className="block h-full origin-left scale-x-0 bg-gradient-to-r from-gold-500 via-gold-200 to-gold-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
