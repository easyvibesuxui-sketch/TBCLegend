"use client";

import Medallion from "@/components/ui/Medallion";
import { useI18n } from "@/components/LocaleProvider";
import { localePath, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/asset";

/**
 * Chrome, exactly as the reference sets it: the mark alone at top left, and a
 * bordered white pill at top right. Both sit in `mix-blend-difference` so they
 * invert themselves over the dark and flooded sections instead of needing a
 * scroll listener to swap colours.
 */
export default function Nav() {
  const { t } = useI18n();
  const links = [
    { href: "#legend", label: t.nav.legend },
    { href: "#houses", label: t.nav.houses },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex items-start justify-between p-4 sm:p-6">
        <a
          href="#hero"
          className="pointer-events-auto flex items-center gap-2 mix-blend-difference"
          aria-label={`${t.nav.brand1} ${t.nav.brand2}`}
        >
          <Medallion className="h-9 w-9 text-paper sm:h-11 sm:w-11" />
          {/* The wordmark does not fit beside the pill on narrow screens */}
          <span className="hidden font-display text-sm leading-[0.95] text-paper sm:block sm:text-base">
            {t.nav.brand1}
            <br />
            {t.nav.brand2}
          </span>
        </a>

        <nav className="pointer-events-auto flex items-stretch border border-ink bg-paper-bright">
          {/*
            A real link to the other language's page, not a client-side
            toggle: each locale is its own prerendered URL, so this works
            without JavaScript and gives the reader something to share.
          */}
          <a
            href={asset(localePath(t.other.code as Locale))}
            hrefLang={t.other.code}
            title={t.other.title}
            className="label border-r border-ink px-3 py-2.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper sm:px-4 sm:py-3"
          >
            {t.other.label}
          </a>
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`label px-3 py-2.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper sm:px-6 sm:py-3 ${
                i > 0 ? "border-l border-ink" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quiz"
            style={{ background: "var(--house, #CF2A20)" }}
            className="label border-l border-ink px-3 py-2.5 text-paper transition-colors duration-300 hover:bg-ink sm:px-6 sm:py-3"
          >
            {t.nav.quiz}
          </a>
        </nav>
      </div>
    </header>
  );
}
