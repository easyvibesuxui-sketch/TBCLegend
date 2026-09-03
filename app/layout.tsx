import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/*
 * DM Themestia — a decorative majuscule Georgian face, used for headings and
 * labels. It carries Mkhedruli, digits and Roman numerals (I V X C M) but no
 * Latin alphabet, so anything Latin must stay on the body or serif stack.
 */
const display = localFont({
  src: "./fonts/dm-themestia-regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  // Falls back per-glyph for the characters the face does not carry.
  fallback: ["Noto Serif Georgian", "Georgia", "serif"],
});

/* Serif that backs the display face wherever it has no glyph. */
const serif = Noto_Serif_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const body = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "საგანძურის მარათონი | Treasure Marathon",
  description:
    "ზღაპრული სამეფოს უძველესი საგანძური დაიმსხვრა და მილიონობით ოქროს მონეტად იქცა. ოთხი დიდი საგვარეულო მათ საძებნელად გაემართა — შენ რომელ სახლს ეკუთვნი?",
  openGraph: {
    title: "საგანძურის მარათონი",
    description:
      "ოთხი საგვარეულო, მილიონობით ოქროს მონეტა და ერთი ლეგენდა. გაიარე ფინანსური ქვიზი და გაიგე, რომელ სახლს ეკუთვნი.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#03040A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ka"
      className={`${display.variable} ${serif.variable} ${body.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
