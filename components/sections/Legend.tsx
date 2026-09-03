"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { LEGEND_CHAPTERS } from "@/lib/houses";
import ArtPlate from "@/components/ui/ArtPlate";
import Caption from "@/components/ui/Caption";
import HoldPuck from "@/components/ui/HoldPuck";
import Panel from "@/components/ui/Panel";
import TornEdge from "@/components/ui/TornEdge";

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
            <Panel
              data-drift="1"
              className="ml-auto aspect-[16/10] w-full sm:w-[86%]"
            >
              <ArtPlate label={one.plate} tone="paper" />
            </Panel>

            {/* Inset panel, hung off the opposite corner */}
            <Panel className="absolute -left-1 top-[14%] hidden aspect-[4/3] w-[26%] sm:block">
              <ArtPlate label="[Inset: სამეფოს ხედი]" tone="ochre" />
            </Panel>

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
          <TornEdge color="#6E2020" side="bottom" seed={9} />
        </div>
      </div>

      {/* ─────────── II — oxblood flood, the gesture ─────────── */}
      <div
        data-flood
        className="grain-paper grain-flood relative overflow-hidden bg-oxblood"
      >

        <div className="relative z-10 flex min-h-[100svh] flex-col px-4 py-28 sm:px-8 sm:py-40">
          <div className="absolute inset-0">
            <ArtPlate label={two.plate} tone="oxblood" scrub={shatter} labelAlign="bottom" />
          </div>

          {/* flex-1 so the two caption blocks push to the top and foot of the plate */}
          <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-24">
            <div>
              <span className="label mb-8 block text-paper/75">
                {two.index} — მისტიკური ღამე
              </span>
              <Caption className="sm:w-[52%]">{two.captions[0]}</Caption>
            </div>

            <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-end sm:justify-between">
              <Caption delay={0.1} className="sm:w-[46%]">
                {two.captions[1]}
              </Caption>
              <HoldPuck lines={["დაიჭირე", "და გასწიე"]} />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 h-16 sm:h-20">
          <TornEdge color="#F2F1EF" side="bottom" seed={14} />
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

          <Panel
            data-drift="0.6"
            className="aspect-[3/4] sm:col-span-7 sm:-mr-8"
          >
            <ArtPlate label={three.plate} tone="ochre" />
          </Panel>
        </div>
      </div>
    </section>
  );
}
