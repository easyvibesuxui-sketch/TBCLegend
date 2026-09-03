"use client";

import Medallion from "@/components/ui/Medallion";

const LINKS = [
  { href: "#legend", label: "ლეგენდა" },
  { href: "#houses", label: "სახლები" },
];

/**
 * Chrome, exactly as the reference sets it: the mark alone at top left, and a
 * bordered white pill at top right. Both sit in `mix-blend-difference` so they
 * invert themselves over the dark and flooded sections instead of needing a
 * scroll listener to swap colours.
 */
export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex items-start justify-between p-4 sm:p-6">
        <a
          href="#hero"
          className="pointer-events-auto flex items-center gap-2 mix-blend-difference"
          aria-label="საგანძურის მარათონი"
        >
          <Medallion className="h-9 w-9 text-paper sm:h-11 sm:w-11" />
          {/* The wordmark does not fit beside the pill on narrow screens */}
          <span className="hidden font-display text-sm leading-[0.95] text-paper sm:block sm:text-base">
            საგანძურის
            <br />
            მარათონი
          </span>
        </a>

        <nav className="pointer-events-auto flex items-stretch border border-ink bg-paper-bright">
          {LINKS.map((link, i) => (
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
            className="label border-l border-ink bg-signal px-3 py-2.5 text-paper transition-colors duration-300 hover:bg-ink sm:px-6 sm:py-3"
          >
            ქვიზი
          </a>
        </nav>
      </div>
    </header>
  );
}
