import { PLATES, type Plate } from "@/lib/plates";
import type { Dict } from "@/lib/i18n";

/**
 * The four trials on the road — beats 11 to 14 of `STORY-V2.md`.
 *
 * Each is a financial decision in costume, which is what the quiz at the end
 * measures anyway: the bridge is opportunity cost, the market is the price of
 * information under uncertainty, the winter is liquidity against comfort, the
 * purse is order against gain. The word "budget" appears nowhere.
 *
 * Two rules hold across all four:
 *
 * **Neither option loses.** Both continue the story and both say something
 * true about the reader. A trial that can be failed is a game, not a story.
 *
 * **Each house is offered exactly twice.** Across four trials that is eight
 * options and four houses, so no house can be reached more often than another
 * and the structure cannot favour one.
 */
export type Trial = {
  id: string;
  /** Beat number in STORY-V2.md */
  index: string;
  plate: Plate;
  tone: "paper" | "ochre" | "oxblood" | "red" | "night";
  options: [TrialOption, TrialOption];
};

export type TrialOption = {
  /** The house this way of acting belongs to */
  house: string;
};

/**
 * A trial with its words for one locale.
 *
 * `Omit` rather than a plain intersection: intersecting `options` would leave
 * it as `[TrialOption, TrialOption] & [SpokenOption, SpokenOption]`, and a
 * `.map` over that resolves against the wordless half.
 */
export type SpokenTrial = Omit<Trial, "options"> & {
  title: string;
  setup: readonly string[];
  lesson: string;
  options: [SpokenOption, SpokenOption];
};

export type SpokenOption = TrialOption & {
  label: string;
  cost: string;
  outcome: string;
};

/** Join a trial to its text. */
export function spoken(trial: Trial, t: Dict): SpokenTrial {
  const text = t.trialText[trial.id as keyof Dict["trialText"]];
  return {
    ...trial,
    title: text.title,
    setup: text.setup,
    lesson: text.lesson,
    options: [
      { ...trial.options[0], ...text.options[0] },
      { ...trial.options[1], ...text.options[1] },
    ],
  };
}

export const TRIALS: Trial[] = [
  {
    id: "bridge",
    index: "11",
    plate: PLATES.bridge,
    tone: "paper",
    options: [
      {
        house: "kharjiani",
      },
      {
        house: "anabaridze",
      },
    ],
  },
  {
    id: "market",
    index: "12",
    plate: PLATES.market,
    tone: "ochre",
    options: [
      {
        house: "dovlatia",
      },
      {
        house: "baratishvili",
      },
    ],
  },
  {
    id: "winter",
    index: "13",
    plate: PLATES.winter,
    tone: "night",
    options: [
      {
        house: "kharjiani",
      },
      {
        house: "anabaridze",
      },
    ],
  },
  {
    id: "purse",
    index: "14",
    plate: PLATES.purse,
    tone: "oxblood",
    options: [
      {
        house: "dovlatia",
      },
      {
        house: "baratishvili",
      },
    ],
  },
];

/** Sanity: each house must be offered exactly twice across the four trials. */
export function houseOfferCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const t of TRIALS)
    for (const o of t.options) counts[o.house] = (counts[o.house] ?? 0) + 1;
  return counts;
}
