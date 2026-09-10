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

/** The three readings of the shattering, in the order chapter II names them. */
const DOUBTS = [PLATES.accident, PLATES.betrayal, PLATES.prophecy];
const DOUBT_LABELS = ["უბედური შემთხვევა", "ღალატი", "წინასწარმეტყველება"];

/**
 * The story, told as comic pages. Each chapter picks one of three
 * compositions from the reference: a panel with insets on paper, a full
 * colour flood carrying the gesture, or a split page.
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

      // The shattering plate scrubs with the flood section that holds it.
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
      {/* ─────────── I — on paper, panel with insets ─────────── */}
      <div className="grain-paper relative bg-paper px-4 pb-24 pt-32 sm:px-8 sm:pb-36 sm:pt-44">
        {/* The paper tears in over the cover above it */}
        <div className="absolute inset-x-0 -top-14 z-20 h-16 sm:-top-20 sm:h-24">
          <TornEdge color="#F2F1EF" side="top" seed={5} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <span className="label mb-10 block text-ink/45">
            {one.index} — პროლოგი
          </span>

          <div className="relative">
            <PanelFlight className="ml-auto w-full sm:w-[86%]">
              <Panel className="aspect-[16/10] w-full">
                <ArtPlate {...one.plate} tone="paper" />
              </Panel>
            </PanelFlight>

            {/*
              The inset flies too, but from a steeper angle and a smaller
              start, so it reads as a second card at a nearer depth rather
              than a flat sticker on a moving panel.
            */}
            <PanelFlight
              from={22}
              scale={0.62}
              className="absolute -left-1 top-[14%] hidden w-[26%] sm:block"
            >
              <Panel className="aspect-[4/3] w-full">
                <ArtPlate {...PLATES.hall} tone="paper" />
              </Panel>
            </PanelFlight>

            <Caption className="relative -mt-10 ml-0 sm:absolute sm:-bottom-8 sm:left-[6%] sm:mt-0">
              {one.captions[0]}
            </Caption>
          </div>

          <Caption
            delay={0.1}
            className="ml-auto mt-10 sm:mt-24 sm:w-[46%]"
          >
            {one.captions[1]}
          </Caption>
        </div>

        {/* The night bites up into the paper */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-24">
          <TornEdge color="#1C1C1C" side="bottom" seed={9} />
        </div>
      </div>

      {/* ─────────── the departure ─────────── */}
      {/*
        No new prose: the clip is the beat. A band rather than a full viewport
        so it reads as one more panel in the sequence, not a second hero.
      */}
      <div className="grain-paper grain-flood relative overflow-hidden bg-ink-night">
        <div className="relative h-[62svh] min-h-[380px] w-full sm:h-[78svh]">
          <ArtPlate {...PLATES.gate} tone="night" />
          <div className="pointer-events-none absolute inset-0 flex items-end p-6 sm:p-12">
            <span className="label text-paper/70">II — გამგზავრება</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
          <TornEdge color="#F2F1EF" side="bottom" seed={17} />
        </div>
      </div>

      {/* ─────────── the reach ─────────── */}
      <div className="grain-paper relative bg-paper px-4 py-24 sm:px-8 sm:py-36">
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <span className="label mb-10 block text-ink/45">III — ხელის გაწვდენა</span>
          <GesturePlate />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
          <TornEdge color="#6E2020" side="bottom" seed={23} />
        </div>
      </div>

      </TiltFrame>

      {/* ─────────── IV — the takeover ─────────── */}
      {/*
        The one beat that stops being a panel. The card arrives, its border
        passes the viewport, and the shattering plays full-bleed while the
        captions hold their corners. The doubts follow on paper after it, since
        three small insets inside a takeover would fight the scene rather than
        read as evidence beside it.
      */}
      <PanelTakeover
        data-flood
        ground="#6E2020"
        captions={[
          {
            corner: "top-left",
            at: [0.05, 0.3],
            node: (
              <>
                <span className="label mb-4 block text-paper/70">
                  {two.index} — მისტიკური ღამე
                </span>
                <Caption>{two.captions[0]}</Caption>
              </>
            ),
          },
          {
            corner: "bottom-right",
            at: [0.45, 0.72],
            node: <Caption>{two.captions[1]}</Caption>,
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
      {/* ─────────── the doubt, on paper after the scene ─────────── */}
      <div className="grain-paper relative bg-paper px-4 py-24 sm:px-8 sm:py-32">
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <p className="label mb-10 text-ink/45">სამი ვერსია</p>
          {/*
            The caption above names an accident, a betrayal and an old
            prophecy, and nothing rendered them. The three insets lay them out
            as evidence, flying from a steeper angle than a full panel so they
            read at a nearer depth.
          */}
          <ul className="grid grid-cols-3 gap-4 sm:gap-8">
            {DOUBTS.map((plate, i) => (
              <li key={plate.label}>
                <PanelFlight from={18} scale={0.7}>
                  <Panel className="aspect-[4/3] w-full">
                    <ArtPlate {...plate} tone="paper" />
                  </Panel>
                </PanelFlight>
                <span className="label mt-3 block text-ink/60">
                  {DOUBT_LABELS[i]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─────────── III — split page on paper ─────────── */}
      <div className="grain-paper relative bg-paper px-4 py-24 sm:px-8 sm:py-36">
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-12 sm:gap-8">
          <div className="sm:col-span-5 sm:pt-16">
            <span className="label mb-8 block text-ink/45">
              {three.index} — მარათონი
            </span>
            <Caption>{three.captions[0]}</Caption>
            <Caption delay={0.1} className="mt-8 sm:ml-10">
              {three.captions[1]}
            </Caption>
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
