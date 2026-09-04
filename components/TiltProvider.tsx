"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motionValue, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Pointer = {
  /** −0.5 … 0.5 across the viewport, from its centre */
  x: MotionValue<number>;
  y: MotionValue<number>;
  enabled: boolean;
};

const TiltContext = createContext<Pointer | null>(null);

/**
 * One pointer listener for the whole page. Every tilting frame reads the same
 * two values, so the site leans as a single object rather than as a dozen
 * independently animated pieces.
 */
export default function TiltProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  const x = useMemo(() => motionValue(0), []);
  const y = useMemo(() => motionValue(0), []);

  /*
   * A tilt that follows a cursor has nothing to follow on touch, and the
   * hover-less fallback would just be a frame frozen slightly off-square.
   *
   * The probe has to run in an effect rather than during render: the server
   * has no matchMedia, so reading it inline makes the first client render
   * disagree with the markup it is hydrating.
   */
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) {
      x.set(0);
      y.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    // Settle back to square when the cursor leaves the document entirely.
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  const value = useMemo(() => ({ x, y, enabled }), [x, y, enabled]);

  return <TiltContext.Provider value={value}>{children}</TiltContext.Provider>;
}

export function useTilt() {
  return useContext(TiltContext);
}
