"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  /** How far the button chases the cursor, in px */
  strength?: number;
  className?: string;
  onClick?: () => void;
};

/**
 * Magnetic CTA: the shell drifts toward the cursor, the label drifts a little
 * further (parallax), and a gilded sheen sweeps across on hover.
 */
export default function MagneticButton({
  children,
  href = "#",
  variant = "primary",
  strength = 22,
  className = "",
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.6 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  // Label travels 1.5x the shell for a subtle depth cue.
  const labelX = useTransform(x, (v) => v * 1.5);
  const labelY = useTransform(y, (v) => v * 1.5);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mx.set(relX * strength);
    my.set(relY * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-abyss-950 sm:px-10 sm:py-[18px] ${
        isPrimary
          ? "bg-gold-300 text-abyss-950 shadow-glow hover:bg-gold-200"
          : "border border-gold-300/35 text-gold-100 hover:border-gold-300/80"
      } ${className}`}
    >
      {/* Sheen sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
      />
      {/* Halo for the ghost variant */}
      {!isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              "0 0 44px -6px rgba(217,172,70,0.55), inset 0 0 24px -10px rgba(217,172,70,0.9)",
          }}
        />
      )}
      <motion.span
        style={{ x: labelX, y: labelY }}
        className="relative z-10 whitespace-nowrap font-body text-[13px] font-medium tracking-[0.14em] sm:text-sm"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
