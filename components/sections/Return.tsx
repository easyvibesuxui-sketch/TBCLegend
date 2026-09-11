"use client";

import { motion } from "framer-motion";
import { PLATES } from "@/lib/plates";
import { TRIALS } from "@/lib/trials";
import { useLedger } from "@/components/LedgerProvider";
import ArtPlate from "@/components/ui/ArtPlate";
import Caption from "@/components/ui/Caption";
import Panel from "@/components/ui/Panel";
import PanelFlight from "@/components/ui/PanelFlight";
import { EASE } from "@/lib/motion";

/**
 * Beat 19: back at the treasury, with what the road actually yielded.
 *
 * The same stone as beat 06, and still empty — the treasure does not come
 * back, which is the one promise the story refuses to make. What the reader
 * sets down instead is small and entirely theirs: one coin per decision
 * taken on the road, drawn from the ledger rather than from a number in the
 * copy, so the pile is literally the size of the road they walked.
 *
 * It also pays off the messenger. Beat 04 left a letter with a seal nobody
 * could place; here it turns out to have been the reader's own, because the
 * thing that summoned them was never a sender — it was the rule they keep
 * about money, which is what the treasure was the whole time.
 */
export default function Return() {
  const { answered } = useLedger();

  return (
    <section
      id="return"
      className="grain-paper relative bg-paper-dim px-4 py-28 sm:px-8 sm:py-40"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <span className="label mb-10 block text-ink/45">19 · დაბრუნება</span>

        <div className="grid items-center gap-12 sm:grid-cols-12 sm:gap-10">
          <PanelFlight from={13} scale={0.8} className="sm:col-span-7">
            <Panel className="aspect-[4/3] w-full">
              <ArtPlate {...PLATES.ret} tone="ochre" />
            </Panel>
          </PanelFlight>

          <div className="sm:col-span-5">
            <p className="font-body text-[15px] leading-[1.8] text-ink/85 sm:text-base">
              საჭურჭლისკენ დაბრუნდი და რაც შეაგროვე, ქვაზე დააწყვე.
            </p>
            <p className="mt-5 font-body text-[15px] leading-[1.8] text-ink/85 sm:text-base">
              გროვა პატარაა. საგანძური არ აღდგება.
            </p>

            {/*
              One mark per trial answered. Silent while the road is unwalked:
              four empty slots would read as a score the reader failed to
              fill, and nothing on this page is scored.
            */}
            {answered > 0 && (
              <motion.ul
                initial="rest"
                whileInView="lit"
                viewport={{ once: true, amount: 0.8 }}
                className="mt-10 flex gap-3"
                aria-label={`შეგროვებული მონეტები: ${answered} ${TRIALS.length}-იდან`}
              >
                {Array.from({ length: answered }).map((_, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      rest: { opacity: 0, scale: 0.4 },
                      lit: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
                    className="h-7 w-7 rounded-full border-2"
                    style={{
                      borderColor: "var(--house, #CF2A20)",
                      background:
                        "color-mix(in srgb, var(--house, #CF2A20) 22%, transparent)",
                    }}
                  />
                ))}
              </motion.ul>
            )}

            <p className="mt-10 font-display text-[clamp(1.2rem,2.8vw,2rem)] leading-[1.25] text-ink">
              მაგრამ ეს გროვა{" "}
              <span style={{ color: "var(--house, #CF2A20)" }}>შენი გზაა</span>{" "}
              — თითო მონეტა ერთი გადაწყვეტილებაა, რომელიც შენ მიიღე.
            </p>
          </div>
        </div>

        {/* The line the whole road was built to earn. */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto mt-24 max-w-[24ch] text-center font-display text-[clamp(1.8rem,5.5vw,4rem)] leading-[0.98] text-ink sm:mt-32"
        >
          საგანძური არასდროს ყოფილა ოქრო.
          <br />
          <span style={{ color: "var(--house, #CF2A20)" }}>
            ის იყო წესი, რომლითაც ოქროს ეპყრობი.
          </span>
        </motion.p>

        {/*
          The messenger's seal, explained. Held back to a caption rather than
          given its own beat: said too loudly it becomes a twist, and it works
          better as something the reader notices.
        */}
        <div className="mt-16 flex justify-center">
          <Caption delay={0.15}>
            წერილი არავის გამოუგზავნია. ბეჭედი შენი იყო — ხელწერა კი არა.
          </Caption>
        </div>
      </div>
    </section>
  );
}
