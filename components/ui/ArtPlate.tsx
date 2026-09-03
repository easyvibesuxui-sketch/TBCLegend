"use client";

import { useEffect, useRef } from "react";

type Tone = "paper" | "night" | "ochre" | "oxblood" | "red";

const TONES: Record<Tone, { bg: string; ink: string; hatch: string }> = {
  // Deliberately darker than the page ground, or a panel reads as a hole
  paper: { bg: "#D6D2CA", ink: "#0E0E0E", hatch: "rgba(14,14,14,0.62)" },
  night: { bg: "#1C1C1C", ink: "#F2F1EF", hatch: "rgba(242,241,239,0.42)" },
  ochre: { bg: "#B08D57", ink: "#0E0E0E", hatch: "rgba(14,14,14,0.45)" },
  oxblood: { bg: "#6E2020", ink: "#F2F1EF", hatch: "rgba(242,241,239,0.34)" },
  red: { bg: "#CF2A20", ink: "#0E0E0E", hatch: "rgba(14,14,14,0.4)" },
};

/**
 * The slot the real artwork drops into.
 *
 * The reference site is built from frame-by-frame illustrated animation played
 * back as video, so this renders a <video> the moment `src` is supplied and
 * otherwise draws a hand-inked stand-in: flooded tone, engraved hatching, and
 * the caption naming the shot it stands for.
 *
 * `scrub` ties playback to the 0 → 1 progress a section feeds it, rather than
 * letting the clip run on its own clock.
 */
export default function ArtPlate({
  label,
  tone = "paper",
  src,
  srcWebm,
  poster,
  scrub,
  labelAlign = "center",
  className = "",
}: {
  label: string;
  tone?: Tone;
  /** H.264 MP4 — the universal fallback, and what Safari needs */
  src?: string;
  /** Optional VP9 WebM, offered first where it is supported */
  srcWebm?: string;
  poster?: string;
  /** Live 0 → 1 playback position, written outside React */
  scrub?: React.MutableRefObject<number>;
  /** Keep the stand-in tag clear of type laid over the plate */
  labelAlign?: "center" | "bottom";
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const t = TONES[tone];

  useEffect(() => {
    const el = video.current;
    if (!el || !scrub) return;
    let raf = 0;
    const tick = () => {
      if (el.readyState >= 1 && el.duration) {
        const target = Math.min(Math.max(scrub.current, 0), 1) * el.duration;
        // Ease toward the target so a fast scroll does not stutter the decode.
        el.currentTime += (target - el.currentTime) * 0.16;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrub, src, srcWebm]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: t.bg }}
      role="img"
      aria-label={label}
    >
      {src ? (
        <video
          ref={video}
          poster={poster}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <>
          {/* Engraved hatching — the linework the illustration will replace */}
          <div
            className="absolute inset-0 opacity-75"
            style={{
              backgroundImage: [
                `repeating-linear-gradient(90deg, ${t.hatch} 0 1px, transparent 1px 14px)`,
                `repeating-linear-gradient(91deg, ${t.hatch} 0 0.7px, transparent 0.7px 29px)`,
                `repeating-linear-gradient(0deg, ${t.hatch} 0 0.7px, transparent 0.7px 34px)`,
              ].join(","),
              maskImage:
                "radial-gradient(78% 70% at 50% 62%, #000 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(78% 70% at 50% 62%, #000 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
            }}
          />
          {/* Ink grain, so the strokes break up like a brush rather than a rule */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='i'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5 0.02' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23i)' opacity='0.5'/%3E%3C/svg%3E\")",
            }}
          />
          <div
            className={`absolute inset-0 flex justify-center p-6 ${
              labelAlign === "bottom" ? "items-end" : "items-center"
            }`}
          >
            <span
              className="border px-3 py-2 text-center font-body text-[9px] uppercase leading-relaxed tracking-wide2 sm:text-[10px]"
              style={{ color: t.ink, borderColor: t.ink }}
            >
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
