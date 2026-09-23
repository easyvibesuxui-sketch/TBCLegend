"use client";

import { useMemo } from "react";
import { useI18n } from "@/components/LocaleProvider";
import { HOUSES, named, type NamedHouse } from "@/lib/houses";
import { TRIALS, spoken, type SpokenTrial } from "@/lib/trials";

/**
 * The four houses and the four trials, with their words in the reader's
 * language.
 *
 * The data files hold only what is the same in every language — ids, colours,
 * artwork, and which house each option belongs to. These put the text back on
 * for the current locale, so a component asks for content once and never
 * touches a dictionary key itself.
 */
export function useHouses(): NamedHouse[] {
  const { t } = useI18n();
  return useMemo(() => HOUSES.map((h) => named(h, t)), [t]);
}

/** One house, named, or null. Saves callers a find(). */
export function useNamedHouse(house: { id: string } | null): NamedHouse | null {
  const { t } = useI18n();
  return useMemo(() => {
    if (!house) return null;
    const base = HOUSES.find((h) => h.id === house.id);
    return base ? named(base, t) : null;
  }, [house, t]);
}

export function useTrials(): SpokenTrial[] {
  const { t } = useI18n();
  return useMemo(() => TRIALS.map((tr) => spoken(tr, t)), [t]);
}
