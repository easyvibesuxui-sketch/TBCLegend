"use client";

import type { ReactNode } from "react";

/**
 * A struck block, not a pill: hard border, bold uppercase label, and a fill
 * that wipes in from the bottom on hover. Matches the reference's nav chrome
 * rather than inventing a separate button language.
 *
 * Colour is not fixed. The button sits on the closing flood, whose colour is
 * whichever house the reader chose, and two of the four accents are dark
 * enough that a hardcoded black border and black label disappear against them.
 * So the two colours are named: `ink` is the type and border, `ground` is what
 * lies behind. Hover wipes one over the other, and the label swaps with it —
 * which is why both are stated rather than leaning on `currentColor`, whose
 * value changes underfoot the moment the label's own colour is set.
 */
export default function InkButton({
  children,
  href = "#",
  variant = "solid",
  ink = "var(--house-ink, #0E0E0E)",
  ground = "var(--house, #CF2A20)",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  /** Border and type colour */
  ink?: string;
  /** The colour behind the button */
  ground?: string;
  className?: string;
}) {
  const solid = variant === "solid";

  // At rest a solid button is a block of ink, so its label reads as ground; an
  // outline button is a hole in the flood, so its label reads as ink. Hover
  // wipes the opposite colour up over each, so the label takes the other one.
  const restLabel = solid ? ground : ink;
  const hoverLabel = solid ? ink : ground;

  return (
    <a
      href={href}
      style={
        {
          borderColor: ink,
          background: solid ? ink : "transparent",
          // Both label colours travel as custom properties so the rest and
          // hover states can both be classes. An inline `color` would win on
          // specificity and the hover swap would never fire.
          "--label": restLabel,
          "--label-hover": hoverLabel,
          "--btn-ink": ink,
        } as React.CSSProperties
      }
      className={`group relative inline-flex items-center justify-center overflow-hidden border px-8 py-4 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[color:var(--btn-ink)] focus-visible:ring-offset-2 sm:px-10 sm:py-5 ${className}`}
    >
      <span
        aria-hidden
        style={{ background: solid ? ground : ink }}
        className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[450ms] ease-out group-hover:scale-y-100"
      />
      <span className="label relative z-10 text-[color:var(--label)] transition-colors duration-[450ms] group-hover:text-[color:var(--label-hover)]">
        {children}
      </span>
    </a>
  );
}
