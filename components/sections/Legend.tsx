"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { LEGEND_CHAPTERS } from "@/lib/houses";
import { PLATES } from "@/lib/plates";
import ArtPlate from "@/components/ui/ArtPlate";
import GesturePlate from "@/components/ui/GesturePlate";
import Caption from "@/components/ui/Caption";
import Panel from "@/components/ui/Panel";
import PanelFlight from "@/components/ui/PanelFlight";
import PanelTakeover from "@/components/ui/PanelTakeover";
import TornEdge from "@/components/ui/TornEdge";
import TiltFrame from "@/components/ui/TiltFrame";

/** The three readings of the shattering, in the order beat 06 names them. */
const DOUBTS = [PLATES.accident, PLATES.betrayal, PLATES.prophecy];
const DOUBT_LABELS = ["უბედური შემთხვევა", "ღალატი", "წინასწარმეტყველება"];

/**
 * Beats 02 to 08 of `docs/production/STORY.md`, in that document's order.
 *
 * The page used to compress these into three chapters, which is what made it
 * read as a handful of sections rather than a story: the hall was a thumbnail
 * pinned to the altar's panel, and the altar itself was a panel among panels
 * rather than the moment the balance is established. Each beat is its own
 * section now, and the two the story marks as takeovers are takeovers.
 *
 * Beat 01 — the choice — is deliberately not here. It runs before this, right
 * after the cover, because everything below is addressed to a reader who has
 * already picked a house.
 */
export default function Legend() {
  const sectionRef = useRef<HTMLElement>(null);
  const shatter = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Panels drift against the page at slightly different rates, the way
      // overlapping artboards do when the reader scrolls past them.
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const depth = Number(el.dataset.drift) || 1;
        gsap.fromTo(
          el,
          { yPercent: 6 * depth },
          {
            yPercent: -6 * depth,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // The shattering plate scrubs with the takeover that holds it.
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: "[data-flood]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              shatter.current = self.progress;
            },
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [one, two, three] = LEGEND_CHAPTERS;

  return (
    <section ref={sectionRef} id="legend" className="relative">
      <TiltFrame>
        {/* ─────────── 02 · სახლი ─────────── */}
        <div className="grain-paper relative bg-paper px-4 pb-28 pt-32 sm:px-8 sm:pb-40 sm:pt-44">
          {/* The paper tears in over the choice above it */}
          <div className="absolute inset-x-0 -top-14 z-20 h-16 sm:-top-20 sm:h-24">
            <TornEdge color="#F2F1EF" side="top" seed={5} />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <span className="label mb-10 block text-ink/45">02 · სახლი</span>

            <div className="relative">
              <PanelFlight className="ml-auto w-full sm:w-[84%]">
                <Panel className="aspect-[16/10] w-full">
                  <ArtPlate {...PLATES.hall} tone="paper" />
                </Panel>
              </PanelFlight>

              <Caption className="relative -mt-10 ml-0 sm:absolute sm:-bottom-10 sm:left-0 sm:mt-0 sm:w-[44%]">
                {one.captions[0]}
              </Caption>
            </div>

            {/* The cloak is the reader's colour — the first place the choice shows */}
            <p
              className="label mt-16 sm:mt-28"
              style={{ color: "var(--house)" }}
            >
              ლაბადა კედელზე შენი ფერისაა
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-24">
            <TornEdge color="#B08D57" side="bottom" seed={9} />
          </div>
        </div>
      </TiltFrame>

      {/* ─────────── 03 · წონასწორობა — takeover ─────────── */}
      {/*
        The story marks this a takeover, and it earns one: the treasure whole
        and breathing is the state everything after it breaks.
      */}
      <PanelTakeover
        ground="#B08D57"
        scrollLength="220vh"
        captions={[
          {
            corner: "top-left",
            at: [0.05, 0.28],
            node: <span className="label text-ink/70">03 · წონასწორობა</span>,
          },
          {
            corner: "bottom-left",
            at: [0.3, 0.6],
            node: <Caption>{one.captions[1]}</Caption>,
          },
        ]}
      >
        <ArtPlate {...PLATES.altar} tone="ochre" />
      </PanelTakeover>

      <TiltFrame>
        {/* ─────────── 04 · გამგზავრება ─────────── */}
        {/* No new prose: the clip is the beat. */}
        <div className="grain-paper grain-flood relative overflow-hidden bg-ink-night">
          <div className="relative h-[62svh] min-h-[380px] w-full sm:h-[78svh]">
            <ArtPlate {...PLATES.gate} tone="night" />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-6 sm:p-12">
              <span className="label text-paper/70">04 · გამგზავრება</span>
              <span className="label" style={{ color: "var(--house)" }}>
                მარტო — შენი ფერის ლაბადით
              </span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
            <TornEdge color="#F2F1EF" side="bottom" seed={17} />
          </div>
        </div>

        {/* ─────────── 05 · საკურთხეველი — the gesture ─────────── */}
        <div className="grain-paper relative bg-paper px-4 py-24 sm:px-8 sm:py-36">
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <span className="label mb-10 block text-ink/45">
              05 · საკურთხეველი
            </span>
            <GesturePlate />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
            <TornEdge color="#6E2020" side="bottom" seed={23} />
          </div>
        </div>
      </TiltFrame>

      {/* ─────────── 06 · ნაპრალი + 07 · ეჭვი — takeover ─────────── */}
      <PanelTakeover
        data-flood
        ground="#6E2020"
        captions={[
          {
            corner: "top-left",
            at: [0.04, 0.26],
            node: (
              <>
                <span className="label mb-4 block text-paper/70">
                  06 · ნაპრალი
                </span>
                <Caption>{two.captions[0]}</Caption>
              </>
            ),
          },
          {
            corner: "bottom-right",
            at: [0.42, 0.62],
            node: <Caption>{two.captions[1]}</Caption>,
          },
          {
            /*
              Beat 07 stays inside the scene rather than following it on paper.
              The recording is explicit that inset panels survive a takeover —
              a small bordered strip in a corner showing a detail of the same
              moment — and the three readings of the shattering are exactly
              that. They were briefly moved out to paper; that lost the point,
              which is that the doubt sits inside the event, not after it.
            */
            corner: "bottom-left",
            at: [0.66, 0.88],
            node: (
              <ul className="flex gap-2 sm:gap-3">
                {DOUBTS.map((plate, i) => (
                  <li key={plate.label} className="w-[30%] max-w-[9rem]">
                    {/*
                      Label above the plate, not below: below, it fell off the
                      foot of the viewport. On its own dark chip, because the
                      strip sits over the artwork and a tinted label is legible
                      on the red ground and invisible on the coins.
                    */}
                    <span className="label mb-2 inline-block bg-ink/85 px-1.5 py-1 text-[9px] text-paper sm:text-[10px]">
                      {DOUBT_LABELS[i]}
                    </span>
                    <Panel className="aspect-[4/3] w-full">
                      <ArtPlate {...plate} tone="paper" />
                    </Panel>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      >
        <ArtPlate
          {...two.plate}
          tone="oxblood"
          scrub={shatter}
          labelAlign="bottom"
        />
      </PanelTakeover>

      <TiltFrame>
        {/* ─────────── 08 · ოთხი ჰორიზონტი ─────────── */}
        <div className="grain-paper relative bg-paper px-4 py-24 sm:px-8 sm:py-36">
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-12 sm:gap-8">
            <div className="sm:col-span-5 sm:pt-16">
              <span className="label mb-8 block text-ink/45">
                08 · ოთხი ჰორიზონტი
              </span>
              <Caption>{three.captions[0]}</Caption>
              <p className="label mt-8 sm:ml-10" style={{ color: "var(--house)" }}>
                ერთი მათგანი შენია
              </p>
            </div>

            <PanelFlight from={10} scale={0.8} className="sm:col-span-7 sm:-mr-8">
              <Panel className="aspect-[21/9] w-full">
                <ArtPlate {...three.plate} tone="ochre" />
              </Panel>
            </PanelFlight>
          </div>
        </div>
      </TiltFrame>
    </section>
  );
}
