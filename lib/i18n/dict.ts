import type { Dict, Locale } from "@/lib/i18n";
import { ka } from "@/lib/i18n/ka";
import { en } from "@/lib/i18n/en";

/**
 * Both locales, resolved at build time.
 *
 * Each page passes its own locale down rather than the client picking one, so
 * the prerendered HTML is already in the right language — no flash of the
 * other one, and a shared link reads correctly before any JavaScript runs.
 */
export const DICTS: Record<Locale, Dict> = { ka, en };
