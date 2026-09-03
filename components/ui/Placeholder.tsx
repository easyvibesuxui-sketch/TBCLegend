"use client";

import { forwardRef } from "react";

type Props = {
  /** Descriptive caption, e.g. "[Illustration: Golden Coins Shattering]" */
  label: string;
  /** Drives the ambient glow so each placeholder feels art-directed */
  hue?: string;
  className?: string;
  ratio?: string;
  sigil?: string;
};

/**
 * Stand-in for final artwork. Deliberately styled — gilded frame, ambient
 * glow, engraved caption — so the composition reads correctly before the
 * illustrations land. Swap the inner content for an <Image /> later.
 */
const Placeholder = forwardRef<HTMLDivElement, Props>(function Placeholder(
  { label, hue = "#EAC46B", className = "", ratio = "aspect-[4/5]", sigil },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`relative isolate overflow-hidden rounded-[2px] ${ratio} ${className}`}
      style={{
        background:
          "linear-gradient(155deg, #0C1122 0%, #05070F 45%, #080B18 100%)",
      }}
      role="img"
      aria-label={label}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 animate-pulseGlow"
        style={{
          background: `radial-gradient(58% 48% at 50% 44%, ${hue}55 0%, ${hue}1A 45%, transparent 72%)`,
        }}
      />

      {/* Engraved grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,172,70,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(217,172,70,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 100%)",
        }}
      />

      {/* Gilded frame + corner ticks */}
      <div className="pointer-events-none absolute inset-3 border border-gold-400/20" />
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-l border-b",
        "right-3 bottom-3 border-r border-b",
      ].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute h-5 w-5 border-gold-300/60 ${pos}`}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        {sigil ? (
          <span
            className="font-display text-4xl leading-none sm:text-5xl"
            style={{ color: hue, textShadow: `0 0 34px ${hue}80` }}
          >
            {sigil}
          </span>
        ) : (
          <span
            className="block h-px w-16"
            style={{
              background: `linear-gradient(90deg, transparent, ${hue}, transparent)`,
            }}
          />
        )}
        <p className="max-w-[26ch] font-body text-[10px] uppercase leading-relaxed tracking-[0.24em] text-gold-100/55 sm:text-[11px]">
          {label}
        </p>
      </div>
    </div>
  );
});

export default Placeholder;
