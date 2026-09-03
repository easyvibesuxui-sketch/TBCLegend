"use client";

import { useMemo } from "react";

/** Deterministic PRNG — identical output on server and client, no hydration drift. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Faint, slowly breathing star layer behind the whole experience. */
export default function Starfield({
  count = 90,
  seed = 7,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const stars = useMemo(() => {
    const rnd = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rnd() * 100,
      top: rnd() * 100,
      size: 0.6 + rnd() * 1.9,
      opacity: 0.15 + rnd() * 0.55,
      delay: rnd() * 6,
      duration: 3.5 + rnd() * 5,
    }));
  }, [count, seed]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gold-100 animate-pulseGlow"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(253,246,227,0.65)",
          }}
        />
      ))}
    </div>
  );
}
