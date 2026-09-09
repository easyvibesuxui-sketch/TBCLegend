import { PLATES, type Plate } from "@/lib/plates";

export type House = {
  id: string;
  name: string;
  latin: string;
  motto: string;
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
    description:
      "საგვარეულო, რომელსაც უყვარს მოქმედება, ცხოვრებით ტკბობა და ენერგიული აქტივობა. ისინი არ ერიდებიან რესურსების გაცემას მიზნების მისაღწევად.",
    tone: "red",
    accent: "#CF2A20",
    plate: PLATES.kharjiani,
    onAccent: "#0E0E0E",
    crest: PLATES.crestKharjiani,
  },
  {
    id: "anabaridze",
    name: "ანაბარიძე",
    latin: "HOUSE ANABARIDZE",
    motto: "მომავალი იგება დღეს",
    description:
      "წინდახედული, სტრატეგიული და დამზოგველი სახლი. მათი დევიზია რესურსების სწორად გადანაწილება და მომავლის დაზღვევა.",
    tone: "night",
    accent: "#2A2A2A",
    plate: PLATES.anabaridze,
    onAccent: "#F2F1EF",
    crest: PLATES.crestAnabaridze,
  },
  {
    id: "dovlatia",
    name: "დოვლათია",
    latin: "HOUSE DOVLATIA",
    motto: "იღბალი მამაცებს ერგებათ",
    description:
      "საგვარეულო, რომელიც ორიენტირებულია სიმდიდრის მოზიდვაზე, იღბალსა და დიდებაზე.",
    tone: "ochre",
    accent: "#B08D57",
    plate: PLATES.dovlatia,
    onAccent: "#0E0E0E",
    crest: PLATES.crestDovlatia,
  },
  {
    id: "baratishvili",
    name: "ბარათიშვილი",
    latin: "HOUSE BARATISHVILI",
    motto: "წესრიგი ძველი დიდებიდან",
    description:
      "ტრადიციული, მტკიცე და გავლენიანი საგვარეულო, რომელიც სამეფოს ძველ დიდებასა და წესრიგს იცავს.",
    tone: "oxblood",
    accent: "#6E2020",
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
