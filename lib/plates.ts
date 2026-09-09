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
  // ── the story ──────────────────────────────────────────────────────────
  altar: still("08-altar-treasure", "უძველესი საგანძური საკურთხეველზე"),
  hall: still("06-hall-cloak", "საგვარეულო დარბაზი და სამგზავრო მოსასხამი"),
  shattering: clip("12-shattering", "დამსხვრევა — მონეტები იფანტება"),
  banners: still("16-four-banners", "ოთხი დროშა ერთ ჰორიზონტზე"),
  gate: clip("09-gate-night", "გამგზავრება — ჭიშკარი ღამით"),

  // ── the houses ─────────────────────────────────────────────────────────
  kharjiani: clip("17-house-kharjiani", "ხარჯიანის დროშა — ცეცხლი და მოძრაობა"),
  anabaridze: still("18-house-anabaridze", "ანაბარიძის საცავი — დალუქული კარი"),
  dovlatia: clip("19-house-dovlatia", "დოვლათიას იღბლის ბორბალი"),
  baratishvili: clip("20-house-baratishvili", "ბარათიშვილის ძველი ბეჭედი"),

  // ── the doubt, three insets ────────────────────────────────────────────
  accident: still("13-inset-accident", "გატეხილი რკინის ღერო"),
  betrayal: still("14-inset-betrayal", "ჩრდილი დახურულ კარზე"),
  prophecy: still("15-inset-prophecy", "ძველი ხელნაწერი"),
} satisfies Record<string, Plate>;
