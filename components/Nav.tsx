"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";

const LINKS = [
  { href: "#legend", label: "ლეგენდა" },
  { href: "#houses", label: "საგვარეულოები" },
  { href: "#quiz", label: "ქვიზი" },
];

export default function Nav() {
  const { scrollYProgress, scrollY } = useScroll();
  const [solid, setSolid] = useState(false);

  const bar = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <>
      {/* Gilded reading-progress thread */}
      <motion.div
        style={{ scaleX: bar }}
        className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-gold-600 via-gold-200 to-gold-600"
      />

      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
          solid
            ? "border-b border-gold-300/10 bg-abyss-950/95 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
          <a href="#hero" className="group flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gold-300/40 text-gold-200 transition-colors duration-500 group-hover:border-gold-200">
              <span className="text-[13px] leading-none">◈</span>
              <span className="absolute inset-0 rounded-full opacity-0 shadow-glow transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="hidden font-display text-sm tracking-wide text-gold-50/90 sm:block">
              საგანძურის მარათონი
            </span>
          </a>

          <div className="flex items-center gap-6 sm:gap-9">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-body text-[11px] uppercase tracking-[0.18em] text-gold-50/55 transition-colors duration-300 hover:text-gold-100 sm:text-xs"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-300 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>
        </nav>
      </motion.header>
    </>
  );
}
