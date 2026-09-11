import { PLATES, type Plate } from "@/lib/plates";

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
  title: string;
  plate: Plate;
  tone: "paper" | "ochre" | "oxblood" | "red" | "night";
  /** Two or three short lines setting the situation */
  setup: string[];
  options: [TrialOption, TrialOption];
  /** The lesson, stated once the reader has chosen either way */
  lesson: string;
};

export type TrialOption = {
  /** The house this way of acting belongs to */
  house: string;
  label: string;
  /** What it costs, in the story's own terms */
  cost: string;
  /** One line of consequence. Never a punishment. */
  outcome: string;
};

export const TRIALS: Trial[] = [
  {
    id: "bridge",
    index: "11",
    title: "ხიდი",
    plate: PLATES.bridge,
    tone: "paper",
    setup: [
      "ხიდზე ბაჟია. ჯიბეში ცამეტი მონეტა გაქვს.",
      "გვერდით — ორი დღის სავალი შემოვლა, უფასო.",
    ],
    options: [
      {
        house: "kharjiani",
        label: "გადაიხადე და გადი",
        cost: "სამი მონეტა, ახლავე მეორე ნაპირზე",
        outcome:
          "მეორე ნაპირზე ნისლი ჯერ არ ჩამოწოლილა. ათი მონეტა დაგრჩა.",
      },
      {
        house: "anabaridze",
        label: "შემოუარე",
        cost: "ორი დღე, სამი მონეტა შენთან",
        outcome:
          "შემოვლა გრძელი აღმოჩნდა, მაგრამ გზად ორი მონეტა იპოვე. თერთმეტი გაქვს.",
      },
    ],
    lesson: "ალტერნატიული ღირებულება — დრო ფასია, თუნდაც ქვითარი არ გერგოს.",
  },
  {
    id: "market",
    index: "12",
    title: "ბაზარი",
    plate: PLATES.market,
    tone: "ochre",
    setup: [
      "ბაზარში კაცი რუკას ჰყიდის. ამბობს, მონეტების გროვას აჩვენებს.",
      "ხუთი მონეტა. რუკა ძველია. კაცი — ვინ იცის.",
    ],
    options: [
      {
        house: "dovlatia",
        label: "იყიდე რუკა",
        cost: "ხუთი მონეტა, შეიძლება მართალი იყოს",
        outcome:
          "რუკამ ხევში მიგიყვანა. მონეტები იქ იყო — ცხრა. ეს ერთხელ გაამართლა.",
      },
      {
        house: "baratishvili",
        label: "ძველ გზას მიჰყევი",
        cost: "არავითარი ფასი, არავითარი აღმოჩენა",
        outcome:
          "ძველ გზაზე სამი მონეტა იპოვე. არც მოგება, არც წაგება.",
      },
    ],
    lesson: "ინფორმაციას ფასი აქვს, სიმართლე კი — გარანტია არა.",
  },
  {
    id: "winter",
    index: "13",
    title: "ზამთარი",
    plate: PLATES.winter,
    tone: "night",
    setup: [
      "პირველი თოვლი მოვიდა. ფარდულში ღამე ოთხი მონეტა ღირს.",
      "გარეთ — უფასოა, და ცივა.",
    ],
    options: [
      {
        house: "kharjiani",
        label: "გაათბე თავი",
        cost: "ოთხი მონეტა, თბილი ღამე",
        outcome: "დილით ადრე გაიღვიძე და მთელი დღე იარე.",
      },
      {
        house: "anabaridze",
        label: "გაუძელი",
        cost: "ცივი ღამე, ოთხი მონეტა შენთან",
        outcome: "დილით ნელა მიდიოდი, მაგრამ მიდიოდი. ოთხი მონეტა ჯიბეშია.",
      },
    ],
    lesson: "სიძუნწესა და წინდახედულობას შორის სხვაობა მხოლოდ შედეგით ჩანს.",
  },
  {
    id: "purse",
    index: "14",
    title: "ქისა",
    plate: PLATES.purse,
    tone: "oxblood",
    setup: [
      "ბილიკზე ქისა გდია. შიგნით შვიდი მონეტაა —",
      "და ერთი სახელი: სხვა სახლის ბეჭედი.",
    ],
    options: [
      {
        house: "dovlatia",
        label: "დაიტოვე",
        cost: "შვიდი მონეტა, არავინ ნახა",
        outcome: "შვიდი მონეტა. ქისა გზაზე დარჩა, ცარიელი.",
      },
      {
        house: "baratishvili",
        label: "დააბრუნე",
        cost: "შვიდი მონეტა ნაკლები",
        outcome:
          "სამი კვირის შემდეგ, სულ სხვა ხევში, უცნობი კარი შენთვის გაიღო.",
      },
    ],
    lesson: "ზოგი ინვესტიცია მონეტებში არ იზომება.",
  },
];

/** Sanity: each house must be offered exactly twice across the four trials. */
export function houseOfferCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const t of TRIALS)
    for (const o of t.options) counts[o.house] = (counts[o.house] ?? 0) + 1;
  return counts;
}
