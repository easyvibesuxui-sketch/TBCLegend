import type { Metadata } from "next";
import Page from "@/components/Page";
import { DICTS } from "@/lib/i18n/dict";

const t = DICTS.en;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    type: "website",
    locale: "en",
  },
  alternates: {
    languages: { ka: "/", en: "/en/" },
  },
};

/** English, at /en/. Its own prerendered file, not a runtime translation. */
export default function Route() {
  return <Page locale="en" />;
}
