import type { Dict } from "@/lib/i18n";

/** The set of plate names the dictionaries carry text for. */
export type PlateKey = keyof Dict["plateText"];

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
  /**
   * Key into `plateText` in the locale dictionaries — not the text itself.
   * It is the accessible name and the stand-in caption, so it has to speak
   * the reader's language; resolve it with `useI18n().t.plateText[label]`,
   * or let ArtPlate do it for you.
   */
  label: PlateKey;
  /** Still plate */
  image?: string;
  /** Silhouette marking the region that wears the reader's house colour */
  tintMask?: string;
  /** Clip, for the five beats where the drawing itself has to move */
  src?: string;
  srcWebm?: string;
  poster?: string;
};

/**
 * A clip plus its poster and WebM twin, from one base name.
 *
 * Both encodes ship, but the MP4 is the one offered first — see the source
 * order in ArtPlate for the measurements behind that. The WebM exists for
 * builds without H.264, not to save bytes; on this material it saves none.
 */
const clip = (name: string, label: PlateKey): Plate => ({
  label,
  src: `/media/${name}.mp4`,
  srcWebm: `/media/${name}.webm`,
  poster: `/media/${name}.jpg`,
  // The poster doubles as the still, so a browser that cannot decode either
  // clip format lands on the right picture instead of the hatched stand-in.
  image: `/media/${name}.jpg`,
});

/** A still plate. */
const still = (name: string, label: PlateKey): Plate => ({
  label,
  image: `/media/${name}.jpg`,
});

export const PLATES = {
  // ── the choice: four seals and the blank medallion ──────────────────────
  crestKharjiani: still("01-crest-kharjiani", "crestKharjiani"),
  crestAnabaridze: still("02-crest-anabaridze", "crestAnabaridze"),
  crestDovlatia: still("03-crest-dovlatia", "crestDovlatia"),
  crestBaratishvili: still("04-crest-baratishvili", "crestBaratishvili"),
  medallion: still("05-medallion-empty", "medallion"),

  // ── the story ──────────────────────────────────────────────────────────
  altar: still("08-altar-treasure", "altar"),
  // The one plate with a spot colour: the cloak takes the reader's house.
  // See scripts/make-cloak-mask.py for how the silhouette was built.
  hall: {
    ...still("06-hall-cloak", "hall"),
    tintMask: "/media/06-hall-cloak-mask.png",
  },
  shattering: clip("12-shattering", "shattering"),
  banners: still("16-four-banners", "banners"),
  gate: clip("09-gate-night", "gate"),

  // ── the houses ─────────────────────────────────────────────────────────
  kharjiani: clip("17-house-kharjiani", "kharjiani"),
  anabaridze: still("18-house-anabaridze", "anabaridze"),
  dovlatia: clip("19-house-dovlatia", "dovlatia"),
  baratishvili: clip("20-house-baratishvili", "baratishvili"),

  // ── the gesture, two layers ────────────────────────────────────────────
  // Drawn separately on bare paper so they can move independently. Unlike the
  // rest of the set these carry a real alpha channel rather than relying on a
  // multiply blend — see scripts/unmix-layer.py for why that trick does not
  // survive here.
  hand: { label: "hand", image: "/media/10-hand-reaching.webp" },
  seal: { label: "seal", image: "/media/11-seal-liquid.webp" },

  // ── the road: beats 21 to 29 of STORY-V2.md ────────────────────────────
  messenger: still("21-messenger", "messenger"),
  verdict: still("22-verdict", "verdict"),
  // A layer like the hand and seal — drawn on bare paper, carries real alpha.
  firstCoin: {
    label: "firstCoin",
    image: "/media/23-first-coin.webp",
  },
  bridge: still("24-bridge", "bridge"),
  market: still("25-market", "market"),
  winter: still("26-winter", "winter"),
  purse: still("27-purse", "purse"),
  well: clip("28-well", "well"),
  ret: still("29-return", "ret"),

  // ── the doubt, three insets ────────────────────────────────────────────
  accident: still("13-inset-accident", "accident"),
  betrayal: still("14-inset-betrayal", "betrayal"),
  prophecy: still("15-inset-prophecy", "prophecy"),
} satisfies Record<string, Plate>;
