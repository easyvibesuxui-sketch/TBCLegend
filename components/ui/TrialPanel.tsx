"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Trial } from "@/lib/trials";
import { useLedger } from "@/components/LedgerProvider";
import ArtPlate from "@/components/ui/ArtPlate";
import Panel from "@/components/ui/Panel";
import PanelFlight from "@/components/ui/PanelFlight";
import { EASE } from "@/lib/motion";

/**
 * One stop on the road: a plate, a situation, two ways through.
 *
 * The shape is deliberately tight — one picture, two sentences, two buttons,
 * and a single line of consequence. Four of these run back to back, and the
 * risk the story notes is that four stops drag if any of them is slow, so
 * none of them is allowed to grow into a scene.
 *
 * Neither option is wrong and nothing is gated: choosing only writes a line
 * into the ledger and reveals what followed. A trial that could be failed
 * would turn the story into a game, and the reader would start optimising
 * instead of answering honestly — which would ruin the one measurement the
 * ending depends on.
 */
export default function TrialPanel({ trial }: { trial: Trial }) {
  const { ledger, record, unrecord } = useLedger();
  const taken = ledger[trial.id];
  const chosen = trial.options.find((o) => o.house === taken) ?? null;

  return (
    <div data-trial={trial.id} className="relative z-10 mx-auto w-full max-w-5xl">
      <span className="label mb-8 block text-ink/45">
        {trial.index} · {trial.title}
      </span>

      <PanelFlight from={12} scale={0.82}>
        <Panel className="aspect-[16/9] w-full">
          <ArtPlate {...trial.plate} tone={trial.tone} />
        </Panel>
      </PanelFlight>

      <div className="mt-10 grid gap-10 sm:grid-cols-12 sm:gap-8">
        <div className="sm:col-span-5">
          {trial.setup.map((line) => (
            <p
              key={line}
              className="font-body text-[15px] leading-[1.8] text-ink/85 sm:text-base"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="sm:col-span-7">
          <AnimatePresence mode="wait">
            {!chosen ? (
              <motion.ul
                key="choices"
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="grid gap-3 sm:grid-cols-2 sm:gap-4"
              >
                {trial.options.map((o) => (
                  <li key={o.house}>
                    <button
                      type="button"
                      data-choose={o.house}
                      onClick={() => record(trial.id, o.house)}
                      className="group block h-full w-full border border-ink bg-paper-bright px-5 py-5 text-left transition-colors duration-300 hover:bg-ink"
                    >
                      <span className="label block text-ink transition-colors duration-300 group-hover:text-paper">
                        {o.label}
                      </span>
                      <span className="mt-3 block font-body text-[12.5px] leading-[1.7] text-ink/60 transition-colors duration-300 group-hover:text-paper/70">
                        {o.cost}
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            ) : (
              <motion.div
                key="outcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p
                  className="label mb-4"
                  style={{ color: "var(--house, #CF2A20)" }}
                >
                  {chosen.label}
                </p>
                <p className="font-body text-[15px] leading-[1.8] text-ink/85 sm:text-base">
                  {chosen.outcome}
                </p>

                {/*
                  The lesson is the same whichever way the reader went. Printing
                  it only for one option would make that option the right
                  answer, and the story is explicit that neither is.
                */}
                <p className="caption mt-8 inline-block">
                  <span className="caption-text">{trial.lesson}</span>
                </p>

                {/* Changing your mind is allowed; the ledger is not a trap. */}
                <button
                  type="button"
                  data-undo
                  onClick={() => unrecord(trial.id)}
                  className="label mt-6 block text-ink/35 underline-offset-4 transition-colors hover:text-ink/70 hover:underline"
                >
                  სხვა გზა ამირჩევია
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
