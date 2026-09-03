"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins.
 * Importing from here guarantees ScrollTrigger is registered exactly once and
 * never touches the server bundle.
 */
if (typeof window !== "undefined") {
  // registerPlugin is idempotent, and module caching keeps this to one run.
  gsap.registerPlugin(ScrollTrigger);

  // Pinned sections + a custom scroll driver need consistent measurement.
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  gsap.defaults({ ease: "power3.out", duration: 1 });
}

export { gsap, ScrollTrigger };
