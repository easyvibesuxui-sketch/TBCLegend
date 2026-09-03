"use client";

import { motion } from "framer-motion";
import InkButton from "@/components/ui/InkButton";
import TornEdge from "@/components/ui/TornEdge";
import { EASE } from "@/lib/motion";
import { HOUSES } from "@/lib/houses";

/** Illustrative standings only — wire to the real leaderboard API later. */
const STANDINGS = [82, 74, 66, 58];

/**
 * The closing plate: a full red flood with the question struck across it at
 * cover scale, the standings beneath, and the two ways in.
 */
export default function CTA() {
  return (
    <section
      id="quiz"
      className="grain-paper relative overflow-hidden bg-signal px-4 py-28 sm:px-8 sm:py-40"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="text-center font-display text-[clamp(2.4rem,9vw,8rem)] leading-[0.86] text-ink"
        >
          <span className="block">შენ რომელ</span>
          <span className="block">სახლს ეკუთვნი?</span>
        </motion.h2>

        {/* Three struck labels, as the reference sets its collection intro */}
        <div className="mt-16 grid gap-8 text-center sm:mt-24 sm:grid-cols-3">
          {[
            "ოთხივე სახლი ერთმანეთს ეჯიბრება",
            "ყველაზე მეტი მონეტა — ლიდერობა",
            "სამეფოს მთავარი ჯილდოები",
          ].map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="label leading-[1.7] text-ink"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-14 max-w-[62ch] text-justify font-body text-[15px] leading-[1.85] text-ink/85 sm:text-base"
        >
          ახლა ოთხივე სახლი ერთმანეთს ეჯიბრება, რათა შეაგროვონ ყველაზე მეტი
          გაბნეული მონეტა, მოიპოვონ ლიდერობა და დაეუფლონ სამეფოს მთავარ
          ჯილდოებს. გსურთ გაიგოთ რომელი საგვარეულო ლიდერობს, ან გაიაროთ
          ფინანსური ქვიზი და მიხვდეთ, თქვენ რომელ ოჯახს მიეკუთვნებით?
        </motion.p>

        {/* Standings */}
        <ul className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          {HOUSES.map((house, i) => (
            <motion.li
              key={house.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <p className="font-display text-[15px] text-ink">{house.name}</p>
              <div className="mt-2 h-[3px] w-full bg-ink/20">
                <motion.span
                  className="block h-full origin-left bg-ink"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: STANDINGS[i] / 100 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.08 }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
        <p className="mt-4 text-center font-body text-[10px] uppercase tracking-label text-ink/40">
          [Placeholder data — ლიდერბორდი რეალურ დროში განახლდება]
        </p>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <InkButton href="#leaderboard" variant="outline">
            ლიდერბორდის ნახვა
          </InkButton>
          <InkButton href="#quiz-start" variant="solid">
            გაიარე ქვიზი
          </InkButton>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
        <TornEdge color="#0E0E0E" side="bottom" seed={27} />
      </div>
    </section>
  );
}
