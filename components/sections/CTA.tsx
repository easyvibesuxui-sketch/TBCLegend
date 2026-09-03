"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { HOUSES } from "@/lib/houses";
import { EASE } from "@/lib/motion";
import CoinField from "@/components/ui/CoinField";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionLabel from "@/components/ui/SectionLabel";
import Starfield from "@/components/ui/Starfield";

/** Illustrative standings only — wire to the real leaderboard API later. */
const STANDINGS = [82, 74, 66, 58];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const coinProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // A gentle, continuous coin drift instead of a full shatter.
  const drift = useTransform(scrollYProgress, [0, 1], [0.06, 0.5]);
  useMotionValueEvent(drift, "change", (v) => {
    coinProgress.current = v;
  });

  return (
    <section
      ref={sectionRef}
      id="quiz"
      className="relative overflow-hidden bg-abyss-950 py-28 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 55%, rgba(217,172,70,0.16) 0%, transparent 65%), linear-gradient(#080B18, #03040A 70%)",
        }}
      />
      <Starfield count={80} seed={41} />

      <div aria-hidden className="absolute inset-0 opacity-70">
        <CoinField progress={coinProgress} count={60} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center lg:px-10">
        <SectionLabel>მარათონი გრძელდება</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mt-7 font-display text-[clamp(2.1rem,6vw,5rem)] font-medium leading-[1.03]"
        >
          <span className="text-gold-50">ვინ შეაგროვებს </span>
          <span className="text-gilded">ყველაზე მეტ მონეტას?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
          className="mx-auto mt-8 max-w-[60ch] font-body text-[15px] leading-[1.95] text-gold-50/60 sm:text-[17px]"
        >
          ახლა ოთხივე სახლი ერთმანეთს ეჯიბრება, რათა შეაგროვონ ყველაზე მეტი
          გაბნეული მონეტა, მოიპოვონ ლიდერობა და დაეუფლონ სამეფოს მთავარ
          ჯილდოებს. გსურთ გაიგოთ რომელი საგვარეულო ლიდერობს, ან გაიაროთ
          ფინანსური ქვიზი და მიხვდეთ, თქვენ რომელ ოჯახს მიეკუთვნებით?
        </motion.p>

        {/* ── Leaderboard teaser ─────────────────────────────── */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 sm:gap-x-6"
        >
          {HOUSES.map((house, i) => (
            <motion.li
              key={house.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: EASE, delay: i * 0.1 },
                },
              }}
              className="text-left"
            >
              <p className="font-body text-[11px] tracking-[0.12em] text-gold-50/70">
                {house.name}
              </p>
              <div className="mt-3 h-[2px] w-full rounded-full bg-gold-100/10">
                <motion.span
                  className="block h-full origin-left rounded-full"
                  style={{ background: house.accent }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: STANDINGS[i] / 100 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.3 + i * 0.1 }}
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <p className="mt-5 font-body text-[9px] uppercase tracking-[0.2em] text-gold-100/25">
          [Placeholder data — ლიდერბორდი რეალურ დროში განახლდება]
        </p>

        {/* ── Actions ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton href="#leaderboard" variant="ghost">
            ლიდერბორდის ნახვა
          </MagneticButton>
          <MagneticButton href="#quiz-start" variant="primary">
            გაიარე ქვიზი
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
