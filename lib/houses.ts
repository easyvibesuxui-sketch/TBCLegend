export type House = {
  id: string;
  /** Georgian house name as shown on the crest */
  name: string;
  latin: string;
  sigil: string;
  motto: string;
  description: string;
  /** Trait bars — purely illustrative of each house's temperament */
  traits: { label: string; value: number }[];
  /** Tailwind-free raw colours, fed straight into gradients and glows */
  accent: string;
  accentSoft: string;
  placeholder: string;
};

export const HOUSES: House[] = [
  {
    id: "kharjiani",
    name: "ხარჯიანი",
    latin: "House Kharjiani",
    sigil: "✦",
    motto: "ცხოვრება ერთხელ გვეძლევა",
    description:
      "საგვარეულო, რომელსაც უყვარს მოქმედება, ცხოვრებით ტკბობა და ენერგიული აქტივობა. ისინი არ ერიდებიან რესურსების გაცემას მიზნების მისაღწევად.",
    traits: [
      { label: "მოქმედება", value: 95 },
      { label: "ენერგია", value: 88 },
      { label: "დაზოგვა", value: 34 },
    ],
    accent: "#E0653A",
    accentSoft: "rgba(224,101,58,0.4)",
    placeholder: "[Illustration: House Kharjiani — Ember Coin Crest]",
  },
  {
    id: "anabaridze",
    name: "ანაბარიძე",
    latin: "House Anabaridze",
    sigil: "◈",
    motto: "მომავალი იგება დღეს",
    description:
      "წინდახედული, სტრატეგიული და დამზოგველი სახლი. მათი დევიზია რესურსების სწორად გადანაწილება და მომავლის დაზღვევა.",
    traits: [
      { label: "სტრატეგია", value: 93 },
      { label: "დაზოგვა", value: 97 },
      { label: "რისკი", value: 22 },
    ],
    accent: "#6E8BFF",
    accentSoft: "rgba(110,139,255,0.4)",
    placeholder: "[Illustration: House Anabaridze — Vault Sigil]",
  },
  {
    id: "dovlatia",
    name: "დოვლათია",
    latin: "House Dovlatia",
    sigil: "❖",
    motto: "იღბალი მამაცებს ერგებათ",
    description:
      "საგვარეულო, რომელიც ორიენტირებულია სიმდიდრის მოზიდვაზე, იღბალსა და დიდებაზე.",
    traits: [
      { label: "იღბალი", value: 91 },
      { label: "სიმდიდრე", value: 89 },
      { label: "სიფრთხილე", value: 41 },
    ],
    accent: "#EAC46B",
    accentSoft: "rgba(234,196,107,0.42)",
    placeholder: "[Illustration: House Dovlatia — Fortune Wheel Crest]",
  },
  {
    id: "baratishvili",
    name: "ბარათიშვილი",
    latin: "House Baratishvili",
    sigil: "✵",
    motto: "წესრიგი ძველი დიდებიდან",
    description:
      "ტრადიციული, მტკიცე და გავლენიანი საგვარეულო, რომელიც სამეფოს ძველ დიდებასა და წესრიგს იცავს.",
    traits: [
      { label: "ტრადიცია", value: 96 },
      { label: "გავლენა", value: 87 },
      { label: "სიახლე", value: 30 },
    ],
    accent: "#9F7BE0",
    accentSoft: "rgba(159,123,224,0.4)",
    placeholder: "[Illustration: House Baratishvili — Ancient Seal]",
  },
];

/** Narrative beats of the legend, revealed one by one on scroll. */
export const LEGEND_CHAPTERS = [
  {
    id: "chapter-1",
    index: "I",
    kicker: "პროლოგი",
    title: "უძველესი საგანძური",
    body: "საუკუნეების განმავლობაში, ზღაპრულ სამეფოს ოთხი დიდი და დიდებული საგვარეულო (სახლი) ერთობლივად მართავდა. სამეფოში სიმშვიდეს, ბალანსსა და კეთილდღეობას იცავდა ერთი უძველესი, საიდუმლო საგანძური, რომელსაც ჯადოსნური ძალა ჰქონდა.",
    placeholder: "[Illustration: The Ancient Treasure Vault, Glowing]",
    hue: "#EAC46B",
  },
  {
    id: "chapter-2",
    index: "II",
    kicker: "მისტიკური ღამე",
    title: "დამსხვრევა",
    body: "ერთ მისტიკურ ღამეს, მოულოდნელად, ეს მთავარი საგანძური ნაწილებად დაიმსხვრა, მილიონობით ოქროს მონეტად იქცა და სამეფოს სხვადასხვა შორეულ კუთხეში მიმოიფანტა. არავინ იცის, ეს უბედური შემთხვევა იყო, მტრის ღალატი, თუ ძველი წინასწარმეტყველების აღსრულება.",
    placeholder: "[Illustration: Golden Coins Shattering Across the Sky]",
    hue: "#E0653A",
  },
  {
    id: "chapter-3",
    index: "III",
    kicker: "მარათონი",
    title: "ოთხი სახლის გზა",
    body: "სამეფოში ბალანსის აღსადგენად და საკუთარი ძალაუფლების დასამტკიცებლად, ოთხივე საგვარეულო ოქროს მონეტების საძიებლად გაემართა. თითოეულ სახლს აქვს თავისი სიმართლე, თავისი ეჭვები და სამეფოს მომავლის საკუთარი ხედვა.",
    placeholder: "[Illustration: Four Banners Marching Across the Kingdom]",
    hue: "#6E8BFF",
  },
];
