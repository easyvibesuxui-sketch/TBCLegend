import { PLATES, type Plate } from "@/lib/plates";
import type { Dict } from "@/lib/i18n";

/**
 * A house, minus its words.
 *
 * Name, motto, price and description live in the locale dictionaries keyed by
 * `id` — see lib/i18n/ka.ts. What stays here is everything that is the same
 * in every language: the identity, the colours, the artwork. `useHouses()`
 * puts the two halves back together for the current locale.
 */
export type House = {
  id: string;
  latin: string;
  /** Spot colour this house's panel commits to */
  tone: "paper" | "ochre" | "oxblood" | "red" | "night";
  /**
   * The colour this house threads through the whole page once it is chosen.
   * Kept as a literal hex rather than a Tailwind token because it is written
   * into a CSS custom property at runtime, where a class name cannot reach.
   */
  accent: string;
  /**
   * The ink that reads on top of `accent`. Two of the four accents are dark
   * enough that the page's default black type vanishes against them, so each
   * house states its own rather than leaving it to be guessed.
   */
  onAccent: string;
  /**
   * The accent again, for the page's night grounds (#1C1C1C — the gate, the
   * well, the price). Two of the four accents are dark by design: Anabaridze
   * is #2A2A2A, which measures 1.19:1 against that ground, and Baratishvili's
   * oxblood 1.53:1 — both effectively invisible. These are the same marks
   * lifted until they clear 4.5:1, so a house reads on black without the page
   * having to pick a different colour and call it the same house.
   */
  accentOnDark: string;
  plate: Plate;
  /** The seal, shown in the choice and struck into the medallion */
  crest: Plate;
};

export const HOUSES: House[] = [
  {
    id: "kharjiani",
    latin: "HOUSE KHARJIANI",
    tone: "red",
    accent: "#CF2A20",
    accentOnDark: "#E35249",
    plate: PLATES.kharjiani,
    onAccent: "#0E0E0E",
    crest: PLATES.crestKharjiani,
  },
  {
    id: "anabaridze",
    latin: "HOUSE ANABARIDZE",
    tone: "night",
    accent: "#2A2A2A",
    accentOnDark: "#F2F1EF",
    plate: PLATES.anabaridze,
    onAccent: "#F2F1EF",
    crest: PLATES.crestAnabaridze,
  },
  {
    id: "dovlatia",
    latin: "HOUSE DOVLATIA",
    tone: "ochre",
    accent: "#B08D57",
    accentOnDark: "#B08D57",
    plate: PLATES.dovlatia,
    onAccent: "#0E0E0E",
    crest: PLATES.crestDovlatia,
  },
  {
    id: "baratishvili",
    latin: "HOUSE BARATISHVILI",
    tone: "oxblood",
    accent: "#6E2020",
    accentOnDark: "#C46B5E",
    plate: PLATES.baratishvili,
    onAccent: "#F2F1EF",
    crest: PLATES.crestBaratishvili,
  },
];

export type Chapter = {
  id: string;
  index: string;
  /** Index into `legend.chapters` in the dictionaries */
  text: number;
  /*
   * The story runs as caption boxes hung off panel edges — two or three short
   * blocks per chapter, never one long paragraph. The blocks themselves are
   * in the dictionaries; `text` says which set.
   */
  plate: Plate;
  tone: "paper" | "ochre" | "oxblood" | "red" | "night";
  /** "flood" fills the viewport with the tone; "panel" sits on paper. */
  layout: "panel" | "flood" | "split";
};

export const LEGEND_CHAPTERS: Chapter[] = [
  {
    id: "chapter-1",
    index: "I",
    text: 0,
    plate: PLATES.altar,
    tone: "paper",
    layout: "panel",
  },
  {
    id: "chapter-2",
    index: "IV",
    text: 1,
    plate: PLATES.shattering,
    tone: "oxblood",
    layout: "flood",
  },
  {
    id: "chapter-3",
    index: "V",
    text: 2,
    plate: PLATES.banners,
    tone: "ochre",
    layout: "split",
  },
];

/** A house with its words for one locale. */
export type NamedHouse = House & {
  name: string;
  motto: string;
  price: string;
  description: string;
};

/** Join a house to its text. */
export function named(house: House, t: Dict): NamedHouse {
  return { ...house, ...t.houseText[house.id as keyof Dict["houseText"]] };
}
