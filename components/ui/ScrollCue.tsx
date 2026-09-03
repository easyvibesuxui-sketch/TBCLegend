"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Bottom-corner hint. Laid out horizontally so it stays a single thin line,
 * clear of the coin band that runs across the hero's horizon.
 */
export default function ScrollCue({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay: 1.9 }}
      className="flex items-center gap-4"
    >
      <span className="font-body text-[9px] uppercase tracking-widest2 text-gold-100/50 sm:text-[10px]">
        {label}
      </span>
      <span className="relative block h-px w-14 overflow-hidden bg-gold-300/20 sm:w-20">
        <span className="absolute left-0 top-0 block h-px w-4 animate-scrollDotX bg-gold-200 shadow-[0_0_10px_2px_rgba(234,196,107,0.6)]" />
      </span>
    </motion.div>
  );
}
