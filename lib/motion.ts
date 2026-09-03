import type { Variants } from "framer-motion";

/** Signature easing curve — slow settle, no bounce. */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE, delay: i * 0.09 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, ease: EASE, delay: i * 0.09 },
  }),
};

/** Wrapper that staggers its children into view. */
export const stagger: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  }),
};

/** Per-character mask reveal used by the hero headline. */
export const charReveal: Variants = {
  hidden: { y: "115%", opacity: 0, rotate: 4 },
  show: (i: number = 0) => ({
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: { duration: 1.15, ease: EASE, delay: 0.35 + i * 0.035 },
  }),
};

export const VIEWPORT = { once: true, amount: 0.35 } as const;
