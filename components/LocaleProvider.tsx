"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { DICTS } from "@/lib/i18n/dict";

type Ctx = { locale: Locale; t: Dict };

const LocaleCtx = createContext<Ctx>({ locale: "ka", t: DICTS.ka });

/** Every string on the page comes from here. */
export const useI18n = () => useContext(LocaleCtx);

/**
 * Which language the page is in.
 *
 * Unlike HouseProvider and LedgerProvider this holds nothing and remembers
 * nothing: the locale arrives as a prop from the route that rendered it, so
 * the prerendered HTML is already in the right language. Storing a preference
 * and swapping text after mount would mean every shared link opened in
 * Georgian and flickered, and a crawler would only ever see one language.
 */
export default function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: DICTS[locale] }), [locale]);
  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}
