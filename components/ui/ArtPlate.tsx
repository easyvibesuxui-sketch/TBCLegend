"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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
 * Three states, in order of preference. A `src` renders the clip, because the
 * reference site is built from frame-by-frame illustrated animation played
 * back as video. An `image` with no clip renders the still — most beats are
 * carried by the panel flight and never needed footage. With neither, it
 * draws a hand-inked stand-in: flooded tone, engraved hatching, and the
 * caption naming the shot it stands for.
 *
 * `scrub` ties playback to the 0 → 1 progress a section feeds it, rather than
 * letting the clip run on its own clock.
 */
export default function ArtPlate({
  label,
  tone = "paper",
  src,
  srcWebm,
  image,
  poster,
  tintMask,
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
  /** Still plate, for the beats the panel flight already animates */
  image?: string;
  /**
   * A silhouette whose alpha marks the one region of the plate that wears the
   * reader's house colour — see scripts/make-cloak-mask.py. Rendered as a
   * spot-colour layer in multiply, which is how a second plate behaves in
   * print: the black linework stays black and only the paper beneath it takes
   * the ink.
   */
  tintMask?: string;
  poster?: string;
  /** Live 0 → 1 playback position, written outside React */
  scrub?: React.MutableRefObject<number>;
  /** Keep the stand-in tag clear of type laid over the plate */
  labelAlign?: "center" | "bottom";
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const t = TONES[tone];
  const reduced = usePrefersReducedMotion();

  /*
   * Shots land one at a time, so a plate is routinely pointed at footage that
   * is not in the repo yet. Rather than leaving a dead black rectangle, fall
   * back to the inked stand-in whenever the video cannot load or decode.
   */
  const [failed, setFailed] = useState(false);
  const [stillFailed, setStillFailed] = useState(false);
  const showVideo = Boolean(src) && !failed;
  // A clip that fell back still has a still to show, if one was supplied.
  const showStill = !showVideo && Boolean(image) && !stillFailed;

  // Prefixed here rather than at the call sites, so a plate cannot be wired
  // with a path that works locally and 404s under the Pages base path.
  const mp4 = asset(src);
  const webm = asset(srcWebm);
  const still = asset(poster);
  const plate = asset(image);
  const tint = asset(tintMask);

  // A new source deserves a fresh attempt.
  useEffect(() => setFailed(false), [src, srcWebm]);
  useEffect(() => setStillFailed(false), [image]);

  /*
   * Deciding a plate has no footage is subtler than listening for an error.
   * A <source> fires error simply because the browser cannot play that type
   * and is moving to the next one, so acting on that would hide a perfectly
   * good MP4 from any browser without WebM. The signal that every candidate
   * has been exhausted is networkState NETWORK_NO_SOURCE; poll for it rather
   * than checking once, since the list is walked asynchronously.
   */
  useEffect(() => {
    if (!src || failed) return;
    const el = video.current;
    if (!el) return;
    let tries = 0;
    const id = window.setInterval(() => {
      if (el.networkState === el.NETWORK_NO_SOURCE || el.error) {
        setFailed(true);
        window.clearInterval(id);
      } else if (el.readyState >= 1 || ++tries > 12) {
        window.clearInterval(id);
      }
    }, 500);
    return () => window.clearInterval(id);
  }, [src, srcWebm, failed]);

  /*
   * A clip with no `scrub` has nothing driving it, so it would sit frozen on
   * its poster. Loop it instead — but only while it is on screen, since four
   * house plates decoding at once off-screen is wasted battery. Reduced motion
   * keeps the poster frame, which is exactly the still the clip was made from.
   */
  useEffect(() => {
    const el = video.current;
    if (!el || scrub || !showVideo || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "150px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scrub, showVideo, reduced]);

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
  }, [scrub, src, srcWebm, showVideo]);

  return (
    <div
      /*
        `isolate` gives the tint layer below a stacking context of its own.
        Without it a multiply blend reaches past the plate and darkens
        whatever the section is standing on.
      */
      className={`relative isolate h-full w-full overflow-hidden ${className}`}
      style={{ background: t.bg }}
      role="img"
      aria-label={label}
    >
      {showVideo ? (
        <video
          ref={video}
          poster={still}
          muted
          playsInline
          loop={!scrub}
          preload="auto"
          /*
            Only a failure of the media element itself counts. When a <source>
            cannot be decoded the browser fires `error` on that <source> and
            moves on to the next one, which is ordinary fallback, not a dead
            plate — and React delivers it here all the same. Taking it at face
            value meant a browser missing the first-listed codec lost *every*
            clip on the page: measured, seven videos became seven stills
            within 400ms in a Chromium without H.264.

            On a <source> error the target is that <source>; when the element
            itself gives up, target and currentTarget are the same node. The
            poll below still catches genuine exhaustion.
          */
          onError={(e) => {
            if (e.target === e.currentTarget) setFailed(true);
          }}
          className="h-full w-full object-cover"
        >
          {/*
            MP4 first, WebM second — the reverse of how this started, and the
            order the encodes actually justify. A <source> list is a
            preference order, so whichever comes first is what nearly every
            reader downloads.

            Measured on the well clip against its master: x264 at crf 27 is
            1.58 MB at SSIM 0.9675, while libvpx-vp9 at crf 40 is 2.24 MB at
            SSIM 0.9412 — larger *and* worse. Pushing VP9 down to 1.47 MB
            costs another 0.037 SSIM. Dense engraving is high-frequency
            detail across the whole frame, which is the case x264 handles
            well and VP9 does not, and five of the six clips in this set show
            the same inversion.

            The WebM still ships: it is the royalty-free path for a build
            without H.264, where MP4-only silently degrades to the poster.
            That is not hypothetical — it is what the headless Chromium these
            plates are tested in does.
          */}
          <source src={mp4} type="video/mp4" />
          {webm && <source src={webm} type="video/webm" />}
        </video>
      ) : showStill ? (
        /*
         * Plain <img>: next/image is switched off for the static export, and
         * these are already sized per role at build time. Decoding async keeps
         * a large plate from blocking the scroll it flies in on.
         */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={plate}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setStillFailed(true)}
          className="h-full w-full object-cover"
        />
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

      {/*
        The spot-colour plate. It rides over the artwork rather than being
        baked into it, so one mask serves all four houses and follows any
        later change to a house's accent for free — the alternative the
        shotlist offered was drawing this plate four times.

        `cover`/`center` on the mask because the artwork underneath is
        `object-cover` with the default centre origin; any other pairing
        slides the silhouette off the thing it is meant to be tracing. It is
        held back until the still is actually showing, so it cannot land on
        the hatched stand-in and colour a shape that is not there.
      */}
      {tint && showStill && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background: "var(--house, #CF2A20)",
            maskImage: `url(${tint})`,
            WebkitMaskImage: `url(${tint})`,
            maskSize: "cover",
            WebkitMaskSize: "cover",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}
