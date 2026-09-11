"use client";

import { motion } from "framer-motion";
import { HOUSES } from "@/lib/houses";
import { useHouse } from "@/components/HouseProvider";
import { EASE } from "@/lib/motion";

/**
 * Beat 17: every virtue, followed all the way, arrives somewhere it did not
 * mean to go.
 *
 * This beat exists to keep the campaign honest. The four houses have just
 * gone past at their best — flags, vaults, wheels, seals — and a page that
 * stopped there would be selling one of them. Here the same four are turned
 * over: motto on the left, what it costs on the right. Nothing is ranked and
 * nothing is withdrawn; the reader's own house is simply the one that stays
 * lit, so the cost being named is first of all *theirs*.
 *
 * Deliberately typographic. The story calls it "one shot — four lines, one
 * under the other, yours picked out", and giving it artwork would make it a
 * fifth scene rather than the turn of the one before it.
 */
export default function Price() {
  const { house: chosen } = useHouse();

  return (
    <section
      id="price"
      className="grain-paper relative px-4 py-28 sm:px-8 sm:py-40"
      style={{ background: "#1C1C1C", color: "#F2F1EF" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <span className="label mb-10 block text-paper/40">17 · ფასი</span>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          className="max-w-[20ch] font-display text-[clamp(1.9rem,5.5vw,4rem)] leading-[0.95]"
        >
          ყველა სათნოებას აქვს ფასი
        </motion.h2>

        <p className="mt-6 max-w-[46ch] font-body text-[15px] leading-[1.8] text-paper/60 sm:text-base">
          როცა ბოლომდე მიჰყვები.
        </p>

        <ul className="mt-16 sm:mt-24">
          {HOUSES.map((house, i) => {
            const mine = chosen?.id === house.id;
            return (
              <motion.li
                key={house.id}
                data-price={house.id}
                data-mine={mine || undefined}
                initial={{ opacity: 0, y: 20 }}
                /*
                  Dimming the other three rather than hiding them is the point:
                  the reader has to be able to see that the other houses are
                  paying too, or the beat reads as a penalty for their choice
                  instead of the cost of having any character at all.
                
                  The dim rides on the animation's own target rather than a
                  class, because `whileInView` resolves to an inline
                  `opacity: 1` and an inline style beats `opacity-40` every
                  time — the row would land back at full strength the moment
                  it scrolled into view.

                  0.65 rather than something more dramatic: the other three
                  rows are still meant to be *read*, and at 0.4 the price
                  column measured 2.55:1 against this ground. The chosen row
                  is already carrying its accent, its rule and its arrow —
                  the dim only has to seat the others behind it.
                */
                whileInView={{ opacity: chosen && !mine ? 0.65 : 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                className="grid gap-4 border-t py-8 sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-10"
                style={{
                  borderColor: mine
                    ? house.accentOnDark
                    : "rgba(242,241,239,0.18)",
                }}
              >
                <p
                  className="label sm:col-span-3"
                  style={{ color: mine ? house.accentOnDark : undefined }}
                >
                  {house.name}
                  {mine && " ←"}
                </p>

                <p className="font-display text-[clamp(1.1rem,2.6vw,1.75rem)] leading-[1.2] sm:col-span-4">
                  „{house.motto}“
                </p>

                {/*
                  The price is the sentence the motto does not say, so it is
                  set as the answer to it — same weight, no dash, no "but".
                */}
                <p className="font-body text-[14px] leading-[1.75] text-paper/85 sm:col-span-5 sm:text-[15px]">
                  {house.price}
                </p>
              </motion.li>
            );
          })}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-16 max-w-[44ch] font-display text-[clamp(1.1rem,2.4vw,1.7rem)] leading-[1.3]"
          style={{ color: "var(--house-night, #E35249)" }}
        >
          არც ერთი მათგანი არ არის სწორი პასუხი. სწორედ ამიტომ არის არჩევანი.
        </motion.p>
      </div>
    </section>
  );
}
