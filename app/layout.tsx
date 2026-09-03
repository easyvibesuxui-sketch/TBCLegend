import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";

/* Serif for the mystical headings, sans for everything you actually read. */
const display = Noto_Serif_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
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
    <html lang="ka" className={`${display.variable} ${body.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
