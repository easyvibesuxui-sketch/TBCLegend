"use client";

import Medallion from "@/components/ui/Medallion";
import { useI18n } from "@/components/LocaleProvider";

const ORIGINAL = "https://tbcbank.ge/ka/treasure-marathon";

/** Small headed block used by the disclaimer. */
function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label mb-3 text-paper/80">{title}</h3>
      <p className="font-body text-[12.5px] leading-[1.85] text-paper/55">
        {children}
      </p>
    </div>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  return (
    <footer className="grain-paper grain-flood relative bg-ink px-6 py-14 text-paper sm:px-10 sm:py-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Medallion className="h-14 w-14 shrink-0" />
            <span className="font-display text-xl leading-[0.95] sm:text-2xl">
              {f.brand1}
              <br />
              {f.brand2}
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:items-end sm:text-right">
            <span className="label text-paper/90">{f.concept}</span>
            <a
              href={ORIGINAL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-paper/60 underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {f.originalLink}
            </a>
          </div>
        </div>

        {/* ── Disclaimer ─────────────────────────────────────── */}
        <div className="mt-16 border-t border-paper/15 pt-12">
          <div className="grid gap-10 sm:grid-cols-3">
            <Note title={f.aboutTitle}>
              <strong className="font-semibold text-paper/80">
                {f.aboutNotReal}
              </strong>
              {f.aboutA}
              <strong className="font-semibold text-paper/80">
                {f.aboutMine}
              </strong>
              {f.aboutB}
              <a
                href={ORIGINAL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/80 underline underline-offset-2 transition-colors hover:text-paper"
              >
                tbcbank.ge/ka/treasure-marathon
              </a>
              .
            </Note>

            <Note title={f.nonCommercialTitle}>{f.nonCommercial}</Note>

            <Note title={f.privacyTitle}>
              {f.privacyA}
              <strong className="font-semibold text-paper/80">
                {f.privacyNone}
              </strong>
              {f.privacyB}
            </Note>
          </div>

          <p className="mt-12 max-w-[80ch] font-body text-[11.5px] leading-[1.8] text-paper/35">
            {f.marks}
          </p>

          <p className="mt-8 font-body text-[11px] uppercase tracking-label text-paper/30">
            {f.rights(new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
}
