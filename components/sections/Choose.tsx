"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HOUSES } from "@/lib/houses";
import { PLATES } from "@/lib/plates";
import { useHouse } from "@/components/HouseProvider";
import { asset } from "@/lib/asset";
import Panel from "@/components/ui/Panel";
import TornEdge from "@/components/ui/TornEdge";
import { EASE } from "@/lib/motion";

/**
 * The choice, and the only place on the page the reader acts on the story
 * rather than watching it.
 *
 * Four seals, and a medallion struck blank and waiting. Picking a house
 * strikes its seal into the medallion and threads that house's colour through
 * the rest of the page — see HouseProvider for how the colour travels.
 *
 * Beat 01 of the story, and it runs before the reader learns anything: the
 * choice is meant to be instinct rather than calculation, which is exactly
 * what the quiz at the end tests. Everything after this is addressed to
 * someone who has already chosen.
 */
export default function Choose() {
  const { house, choose } = useHouse();

  return (
    <section
      id="choose"
      className="grain-paper grain-flood relative overflow-hidden bg-ink-night px-4 py-28 sm:px-8 sm:py-40"
    >
      {/* The night tears in over the cover */}
      <div className="absolute inset-x-0 -top-14 z-20 h-16 sm:-top-20 sm:h-24">
        <TornEdge color="#1C1C1C" side="top" seed={3} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <span className="label mb-8 block text-center text-paper/35">
          01 · სისხლი
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center font-display text-[clamp(2rem,6.5vw,5rem)] leading-[0.9] text-paper"
        >
          აირჩიე შენი სახლი
        </motion.h2>
        <p className="label mt-6 text-center text-paper/45">
          სანამ გზას დაადგები — აირჩიე, ვისი სისხლი გდის
        </p>

        <div className="mt-16 grid items-center gap-10 sm:mt-24 sm:grid-cols-12 sm:gap-10">
          {/* ── the medallion, struck or waiting ── */}
          <div className="sm:col-span-5">
            {/*
              The seal replaces the blank medallion rather than sitting inside
              it. The medallion plate was drawn with a hollow centre "waiting
              to be struck", but that hollow is a fraction of the frame — a
              seal laid into it disappears behind the rope rings and reads as a
              mistake. Swapping the whole plate is what being struck looks
              like, and it lets the seal be read at full size.
            */}
            <Panel className="relative aspect-square w-full bg-paper-dim">
              <AnimatePresence mode="wait">
                <motion.img
                  key={house?.id ?? "blank"}
                  src={asset(house ? house.crest.image : PLATES.medallion.image)}
                  alt={house ? house.crest.label : PLATES.medallion.label}
                  initial={{ scale: house ? 1.35 : 1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: house ? 0.5 : 0.35, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </Panel>

            <div className="mt-6 min-h-[4.5rem]">
              <AnimatePresence mode="wait">
                {house ? (
                  <motion.div
                    key={house.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p
                      className="font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-none"
                      style={{ color: "var(--house)" }}
                    >
                      {house.name}
                    </p>
                    <p className="label mt-3 text-paper/50">„{house.motto}“</p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="label text-paper/35"
                  >
                    მედალიონი ჯერ ცარიელია
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── the four seals ── */}
          <ul className="grid grid-cols-2 gap-4 sm:col-span-7 sm:gap-5">
            {HOUSES.map((h, i) => {
              const active = house?.id === h.id;
              return (
                <motion.li
                  key={h.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
                >
                  <button
                    type="button"
                    onClick={() => choose(h.id)}
                    aria-pressed={active}
                    className="group block w-full text-left"
                  >
                    <Panel
                      className="aspect-square w-full transition-transform duration-500 group-hover:-translate-y-1.5"
                      style={{
                        // The border is the whole selected state: no glow, no
                        // shadow, nothing the print language would not do.
                        borderColor: active ? "var(--house)" : undefined,
                        borderWidth: active ? 3 : undefined,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(h.crest.image)}
                        alt={h.crest.label}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover transition-opacity duration-500 ${
                          house && !active
                            ? "opacity-40 group-hover:opacity-75"
                            : "opacity-100"
                        }`}
                      />
                    </Panel>
                    <p
                      className="label mt-3 transition-colors duration-300"
                      style={{ color: active ? "var(--house)" : undefined }}
                    >
                      <span className={active ? "" : "text-paper/60"}>
                        {h.name}
                      </span>
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
        <TornEdge color="#F2F1EF" side="bottom" seed={33} />
      </div>
    </section>
  );
}
