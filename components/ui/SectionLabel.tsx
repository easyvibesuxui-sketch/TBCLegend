"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Small gilded eyebrow used to title every section. */
export default function SectionLabel({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`flex items-center gap-4 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      {align === "center" && <span className="rule-gold h-px w-10 sm:w-16" />}
      <span className="font-body text-[10px] uppercase tracking-widest2 text-gold-300/80 sm:text-[11px]">
        {children}
      </span>
      <span className="rule-gold h-px w-10 sm:w-16" />
    </motion.div>
  );
}
