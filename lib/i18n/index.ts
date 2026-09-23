import { ka } from "@/lib/i18n/ka";

/**
 * The dictionary's shape, taken from the Georgian.
 *
 * Georgian is the source language — the story was written in it — so it
 * defines the contract and every other locale has to satisfy it. A key
 * missing from `en.ts` is a compile error, which is the only reliable way to
 * stop a sentence silently staying Georgian on the English page.
 *
 * The widening is deliberate: `ka` is `as const`, so without it every string
 * would be its own literal type and the English translations would each fail
 * to match.
 */
export type Dict = {
  [K in keyof typeof ka]: Widen<(typeof ka)[K]>;
};

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : // Functions interpolate names and counts; keep their signatures exact.
      T extends (...a: infer A) => infer R
      ? (...a: A) => Widen<R>
      : T extends readonly (infer E)[]
        ? // readonly, because `ka` is `as const`; a mutable array from a
          // translation is still assignable to it.
          readonly Widen<E>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

export type Locale = "ka" | "en";

export const LOCALES: Locale[] = ["ka", "en"];

/** Georgian lives at the root; English at /en/. */
export function localePath(locale: Locale, basePath = ""): string {
  return locale === "ka" ? `${basePath}/` : `${basePath}/en/`;
}
