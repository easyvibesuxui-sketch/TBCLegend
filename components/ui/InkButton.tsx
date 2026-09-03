"use client";

import type { ReactNode } from "react";

/**
 * A struck block, not a pill: hard ink border, bold uppercase label, and a
 * fill that wipes in from the bottom on hover. Matches the reference's nav
 * chrome rather than inventing a separate button language.
 */
export default function InkButton({
  children,
  href = "#",
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const solid = variant === "solid";

  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden border border-ink px-8 py-4 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 sm:px-10 sm:py-5 ${
        solid ? "bg-ink text-paper" : "bg-transparent text-ink"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[450ms] ease-out group-hover:scale-y-100 ${
          solid ? "bg-paper-bright" : "bg-ink"
        }`}
      />
      <span
        className={`label relative z-10 transition-colors duration-[450ms] ${
          solid ? "group-hover:text-ink" : "group-hover:text-paper"
        }`}
      >
        {children}
      </span>
    </a>
  );
}
