import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect that stays quiet during SSR. GSAP setup must run before
 * paint, so this is what every animation effect in the app uses.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
