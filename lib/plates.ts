/**
 * Every beat's artwork, in one place.
 *
 * The components used to carry a `plate` string that was only ever a caption
 * naming a shot that did not exist yet. Now that the shots do exist, a plate
 * is the artwork itself — and the label survives as the accessible name and
 * as the stand-in text if a file ever fails to load.
 *
 * Files come from `docs/production/KLING-IMAGE-SHOTLIST.md`; the numbering
 * here is that document's shot numbering, so a plate can be traced back to
 * the prompt that made it.
 */
export type Plate = {
  /** Accessible name, and the stand-in caption if the asset fails */
  label: string;
  /** Still plate */
  image?: string;
  /** Clip, for the five beats where the drawing itself has to move */
  src?: string;
  srcWebm?: string;
  poster?: string;
};

/** A clip plus its poster and WebM twin, from one base name. */
const clip = (name: string, label: string): Plate => ({
  label,
  src: `/media/${name}.mp4`,
  srcWebm: `/media/${name}.webm`,
  poster: `/media/${name}.jpg`,
  // The poster doubles as the still, so a browser that cannot decode either
  // clip format lands on the right picture instead of the hatched stand-in.
  image: `/media/${name}.jpg`,
});

/** A still plate. */
const still = (name: string, label: string): Plate => ({
  label,
  image: `/media/${name}.jpg`,
});

export const PLATES = {
  // ── the choice: four seals and the blank medallion ──────────────────────
  crestKharjiani: still("01-crest-kharjiani", "ხარჯიანის გერბი — ალი ხელისგულზე"),
  crestAnabaridze: still("02-crest-anabaridze", "ანაბარიძის გერბი — დალუქული კარი"),
  crestDovlatia: still("03-crest-dovlatia", "დოვლათიას გერბი — იღბლის ბორბალი"),
  crestBaratishvili: still("04-crest-baratishvili", "ბარათიშვილის გერბი — ბეჭედი ცვილში"),
  medallion: still("05-medallion-empty", "ცარიელი მედალიონი — დასარტყმელად მზად"),

  // ── the story ──────────────────────────────────────────────────────────
  altar: still("08-altar-treasure", "უძველესი საგანძური საჭურჭლეში"),
  hall: still("06-hall-cloak", "საგვარეულო დარბაზი და სამგზავრო მოსასხამი"),
  shattering: clip("12-shattering", "დამსხვრევა — მონეტები იფანტება"),
  banners: still("16-four-banners", "ოთხი დროშა ერთ ჰორიზონტზე"),
  gate: clip("09-gate-night", "გამგზავრება — ჭიშკარი ღამით"),

  // ── the houses ─────────────────────────────────────────────────────────
  kharjiani: clip("17-house-kharjiani", "ხარჯიანის დროშა — ცეცხლი და მოძრაობა"),
  anabaridze: still("18-house-anabaridze", "ანაბარიძის საცავი — დალუქული კარი"),
  dovlatia: clip("19-house-dovlatia", "დოვლათიას იღბლის ბორბალი"),
  baratishvili: clip("20-house-baratishvili", "ბარათიშვილის ძველი ბეჭედი"),

  // ── the gesture, two layers ────────────────────────────────────────────
  // Drawn separately on bare paper so they can move independently. Unlike the
  // rest of the set these carry a real alpha channel rather than relying on a
  // multiply blend — see scripts/unmix-layer.py for why that trick does not
  // survive here.
  hand: { label: "ხელი იწვდება", image: "/media/10-hand-reaching.webp" },
  seal: { label: "დნობილი ოქროს ბეჭედი — იხევს", image: "/media/11-seal-liquid.webp" },

  // ── the road: beats 21 to 29 of STORY-V2.md ────────────────────────────
  messenger: still("21-messenger", "წერილი კარის ქვეშ, ცვილის ბეჭდით"),
  verdict: still("22-verdict", "ოთხი ბეჭედი საბჭოს მაგიდაზე"),
  // A layer like the hand and seal — drawn on bare paper, carries real alpha.
  firstCoin: {
    label: "პირველი მონეტა გზის მტვერში",
    image: "/media/23-first-coin.webp",
  },
  bridge: still("24-bridge", "ქვის ხიდი და ბაჟის ჯიხური"),
  market: still("25-market", "ბაზრის მაგიდა, გაშლილი რუკა"),
  winter: still("26-winter", "თოვლიანი გზა, შორეული შუქი"),
  purse: still("27-purse", "მიტოვებული ქისა ბილიკზე"),
  well: still("28-well", "ჭის პირი — ოთხი ანარეკლი წყალში"),
  ret: still("29-return", "ცარიელი საჭურჭლე, მონეტების გროვა"),

  // ── the doubt, three insets ────────────────────────────────────────────
  accident: still("13-inset-accident", "გატეხილი რკინის ღერო"),
  betrayal: still("14-inset-betrayal", "ჩრდილი დახურულ კარზე"),
  prophecy: still("15-inset-prophecy", "ძველი ხელნაწერი"),
} satisfies Record<string, Plate>;
