import { useMemo } from "react";

/** Deterministic PRNG — the same tear on server and client, no hydration drift. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * Sections part on a ragged hand-torn contour rather than a straight rule.
 *
 * The tear paints the section it *introduces*, so it must sit over the
 * outgoing section: `side="top"` fills everything below the ragged line,
 * `side="bottom"` fills everything above it. The parent positions and sizes
 * it and must not paint that band itself, or the tear disappears against its
 * own background.
 */
export default function TornEdge({
  color = "#F2F1EF",
  side = "top",
  seed = 3,
  className = "",
}: {
  color?: string;
  side?: "top" | "bottom";
  seed?: number;
  className?: string;
}) {
  const d = useMemo(() => {
    const rnd = seeded(seed);
    const steps = 150;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 100;
      // Torn paper is a mostly-straight line: a slow swell, fine fibre noise,
      // and the occasional deeper nick where the sheet gave way. Big
      // amplitudes read as mountains, not a tear.
      const swell =
        Math.sin((i / steps) * Math.PI * 2.1 + seed) * 7 +
        Math.sin((i / steps) * Math.PI * 7.3 + seed * 2) * 3;
      const fibre = (rnd() - 0.5) * 7;
      const nick = rnd() < 0.06 ? (rnd() - 0.5) * 22 : 0;
      pts.push({ x, y: Math.max(8, Math.min(92, 50 + swell + fibre + nick)) });
    }
    const back = pts
      .slice()
      .reverse()
      .map((p) => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(" ");

    return side === "top"
      ? `M0,100 L100,100 ${back} L0,100 Z`
      : `M0,0 L100,0 ${back} L0,0 Z`;
  }, [seed, side]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path d={d} fill={color} />
    </svg>
  );
}
