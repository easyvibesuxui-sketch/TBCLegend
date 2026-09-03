/**
 * The mark: a coin struck as a saint's medallion — a rayed disc around a
 * treasure sigil, drawn in line only so it reads at 32px and inverts cleanly
 * over the dark floods.
 */
export default function Medallion({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="18.5" stroke="currentColor" strokeWidth="0.7" />
      {/* Rays */}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r1 = 18.5;
        const r2 = i % 2 === 0 ? 22 : 20.6;
        return (
          <line
            key={i}
            x1={24 + Math.cos(a) * r1}
            y1={24 + Math.sin(a) * r1}
            x2={24 + Math.cos(a) * r2}
            y2={24 + Math.sin(a) * r2}
            stroke="currentColor"
            strokeWidth="0.7"
          />
        );
      })}
      {/* Coin face */}
      <circle cx="24" cy="24" r="9.5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M24 16.5l2.3 5.1 5.5.5-4.2 3.7 1.2 5.4L24 28.3l-4.8 2.9 1.2-5.4-4.2-3.7 5.5-.5z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
