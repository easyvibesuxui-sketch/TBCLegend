"use client";

import { motion } from "framer-motion";

/**
 * Caption box — hung off a panel edge so it straddles the boundary, never
 * centred. Two lines of small uppercase text on off-white with a hairline
 * ink border.
 */
export default function Caption({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={`caption max-w-[min(92vw,30rem)] ${className}`}
    >
      <p className="caption-text">{children}</p>
    </motion.div>
  );
}
