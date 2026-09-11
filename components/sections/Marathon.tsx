"use client";

import { TRIALS } from "@/lib/trials";
import { PLATES } from "@/lib/plates";
import { LEGEND_CHAPTERS } from "@/lib/houses";
import ArtPlate from "@/components/ui/ArtPlate";
import Caption from "@/components/ui/Caption";
import Panel from "@/components/ui/Panel";
import PanelFlight from "@/components/ui/PanelFlight";
import PanelTakeover from "@/components/ui/PanelTakeover";
import TornEdge from "@/components/ui/TornEdge";
import TiltFrame from "@/components/ui/TiltFrame";
import TrialPanel from "@/components/ui/TrialPanel";

/**
 * The road — beats 10 to 15 of `STORY-V2.md`, and the act the page was
 * missing. The marathon used to be a single plate of four banners; here it is
 * where most of the story happens and the only stretch the reader steers.
 *
 * The shape is: one free coin, four trials, one mirror. The free coin sets
 * the tone the trials then charge for, and the well at the end turns the four
 * stops from a test into a thought — every other house had its reasons too.
 */
export default function Marathon() {
  const [, , three] = LEGEND_CHAPTERS;

  return (
    <section id="marathon" className="relative">
      <TiltFrame>
        {/* ─────────── 10 · პირველი მონეტა ─────────── */}
        <div className="grain-paper relative bg-paper px-4 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-36">
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <span className="label mb-8 block text-ink/45">
              10 · პირველი მონეტა
            </span>

            <div className="grid items-center gap-10 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-7">
                <PanelFlight from={14} scale={0.8}>
                  <Panel className="aspect-[4/3] w-full bg-paper-bright">
                    {/*
                      The coin carries alpha rather than sitting in a plate, so
                      it reads as an object lying on the page instead of a
                      picture of one — the same treatment the gesture layers
                      get, and the reason it was drawn on bare paper.
                    */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PLATES.firstCoin.image}
                      alt={PLATES.firstCoin.label}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain p-6"
                    />
                  </Panel>
                </PanelFlight>
              </div>

              <div className="sm:col-span-5">
                <p className="font-body text-[15px] leading-[1.8] text-ink/85 sm:text-base">
                  პირველი მონეტა გზაზე იდო. არავის დაუცავს, არავის დაუმალავს.
                </p>
                <p className="caption mt-8 inline-block">
                  <span className="caption-text">
                    ასე იწყება ყველა მარათონი — ადვილად.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────── 11–14 · the four trials ─────────── */}
        {/*
          Alternating grounds so four stops in a row do not read as one long
          form. Each trial keeps its own spot colour from the story.
        */}
        {TRIALS.map((trial, i) => (
          <div
            key={trial.id}
            className={`grain-paper relative px-4 py-24 sm:px-8 sm:py-32 ${
              i % 2 === 0 ? "bg-paper" : "bg-paper-dim"
            }`}
          >
            <TrialPanel trial={trial} />
          </div>
        ))}
      </TiltFrame>

      {/* ─────────── 15 · ჭა — takeover ─────────── */}
      {/*
        The turn from test to thought, so it takes the screen: four faces in
        the water, all of them the reader. The story calls this the bridge
        between the tale and the quiz.
      */}
      <PanelTakeover
        ground="#1C1C1C"
        scrollLength="230vh"
        captions={[
          {
            corner: "top-left",
            at: [0.05, 0.26],
            node: <span className="label text-paper/70">15 · ჭა</span>,
          },
          {
            corner: "bottom-left",
            at: [0.3, 0.54],
            node: (
              <Caption>
                ჭასთან დაიხარე და წყალში ოთხი სახე დაინახე. ოთხივე შენ იყავი.
              </Caption>
            ),
          },
          {
            corner: "bottom-right",
            at: [0.6, 0.85],
            node: (
              <p
                className="font-display text-[clamp(1.1rem,2.4vw,1.8rem)] leading-[1.25]"
                style={{ color: "var(--house-night, #E35249)" }}
              >
                სხვა სახლი მტერი
                <br />
                არასდროს ყოფილა.
                <br />
                ის შენი სხვა ვარიანტია.
              </p>
            ),
          },
        ]}
      >
        <ArtPlate {...PLATES.well} tone="night" />
      </PanelTakeover>

      <TiltFrame>
        {/* ─────────── 08 · ოთხი ჰორიზონტი — the race itself ─────────── */}
        <div className="grain-paper relative bg-paper px-4 py-24 sm:px-8 sm:py-36">
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-12 sm:gap-8">
            <div className="sm:col-span-5 sm:pt-16">
              <span className="label mb-8 block text-ink/45">
                16 · ოთხი ჰორიზონტი
              </span>
              <p
                className="label mt-8 sm:ml-10"
                style={{ color: "var(--house)" }}
              >
                ერთი მათგანი შენია
              </p>
            </div>

            <PanelFlight from={10} scale={0.8} className="sm:col-span-7 sm:-mr-8">
              <Panel className="aspect-[21/9] w-full">
                <ArtPlate {...three.plate} tone="ochre" />
              </Panel>
            </PanelFlight>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
            <TornEdge color="#F2F1EF" side="bottom" seed={41} />
          </div>
        </div>
      </TiltFrame>
    </section>
  );
}
