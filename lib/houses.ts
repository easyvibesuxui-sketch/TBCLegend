import { PLATES, type Plate } from "@/lib/plates";

export type House = {
  id: string;
  name: string;
  latin: string;
  motto: string;
  /**
   * What the motto costs when followed all the way — beat 17. Every house
   * gets one, because the campaign only stays honest if none of the four is
   * the right answer; a house with a virtue and no price would be exactly
   * that.
   */
  price: string;
  description: string;
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
    name: "ხარჯიანი",
    latin: "HOUSE KHARJIANI",
    motto: "ცხოვრება ერთხელ გვეძლევა",
    price: "და ზამთარი ყოველწლიურად მოდის",
    description:
      "საგვარეულო, რომელსაც უყვარს მოქმედება, ცხოვრებით ტკბობა და ენერგიული აქტივობა. ისინი არ ერიდებიან რესურსების გაცემას მიზნების მისაღწევად.",
    tone: "red",
    accent: "#CF2A20",
    accentOnDark: "#E35249",
    plate: PLATES.kharjiani,
    onAccent: "#0E0E0E",
    crest: PLATES.crestKharjiani,
  },
  {
    id: "anabaridze",
    name: "ანაბარიძე",
    latin: "HOUSE ANABARIDZE",
    motto: "მომავალი იგება დღეს",
    price: "ზოგჯერ იმდენ ხანს იგება, რომ დღე აღარ რჩება",
    description:
      "წინდახედული, სტრატეგიული და დამზოგველი სახლი. მათი დევიზია რესურსების სწორად გადანაწილება და მომავლის დაზღვევა.",
    tone: "night",
    accent: "#2A2A2A",
    accentOnDark: "#F2F1EF",
    plate: PLATES.anabaridze,
    onAccent: "#F2F1EF",
    crest: PLATES.crestAnabaridze,
  },
  {
    id: "dovlatia",
    name: "დოვლათია",
    latin: "HOUSE DOVLATIA",
    motto: "იღბალი მამაცებს ერგებათ",
    price: "მამაცებს — და მათაც, ვისაც ხელახლა სცადეს",
    description:
      "საგვარეულო, რომელიც ორიენტირებულია სიმდიდრის მოზიდვაზე, იღბალსა და დიდებაზე.",
    tone: "ochre",
    accent: "#B08D57",
    accentOnDark: "#B08D57",
    plate: PLATES.dovlatia,
    onAccent: "#0E0E0E",
    crest: PLATES.crestDovlatia,
  },
  {
    id: "baratishvili",
    name: "ბარათიშვილი",
    latin: "HOUSE BARATISHVILI",
    motto: "წესრიგი ძველი დიდებიდან",
    price: "ძველი წესრიგი ახალ გზას ვერ ხედავს",
    description:
      "ტრადიციული, მტკიცე და გავლენიანი საგვარეულო, რომელიც სამეფოს ძველ დიდებასა და წესრიგს იცავს.",
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
  /**
   * The story runs as caption boxes hung off panel edges — two or three short
   * blocks per chapter, never one long paragraph.
   */
  captions: string[];
  plate: Plate;
  tone: "paper" | "ochre" | "oxblood" | "red" | "night";
  /** "flood" fills the viewport with the tone; "panel" sits on paper. */
  layout: "panel" | "flood" | "split";
};

export const LEGEND_CHAPTERS: Chapter[] = [
  {
    id: "chapter-1",
    index: "I",
    captions: [
      "საუკუნეების განმავლობაში, ზღაპრულ სამეფოს ოთხი დიდი და დიდებული საგვარეულო (სახლი) ერთობლივად მართავდა.",
      "სამეფოში სიმშვიდეს, ბალანსსა და კეთილდღეობას იცავდა ერთი უძველესი, საიდუმლო საგანძური, რომელსაც ჯადოსნური ძალა ჰქონდა.",
    ],
    plate: PLATES.altar,
    tone: "paper",
    layout: "panel",
  },
  {
    id: "chapter-2",
    index: "IV",
    captions: [
      "ერთ მისტიკურ ღამეს, მოულოდნელად, ეს მთავარი საგანძური ნაწილებად დაიმსხვრა, მილიონობით ოქროს მონეტად იქცა და სამეფოს სხვადასხვა შორეულ კუთხეში მიმოიფანტა.",
      "არავინ იცის, ეს უბედური შემთხვევა იყო, მტრის ღალატი, თუ ძველი წინასწარმეტყველების აღსრულება.",
    ],
    plate: PLATES.shattering,
    tone: "oxblood",
    layout: "flood",
  },
  {
    id: "chapter-3",
    index: "V",
    captions: [
      "სამეფოში ბალანსის აღსადგენად და საკუთარი ძალაუფლების დასამტკიცებლად, ოთხივე საგვარეულო ოქროს მონეტების საძიებლად გაემართა.",
      "თითოეულ სახლს აქვს თავისი სიმართლე, თავისი ეჭვები და სამეფოს მომავლის საკუთარი ხედვა.",
    ],
    plate: PLATES.banners,
    tone: "ochre",
    layout: "split",
  },
];
