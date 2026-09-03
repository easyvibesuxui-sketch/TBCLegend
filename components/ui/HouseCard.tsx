"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { House } from "@/lib/houses";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A house crest card with cursor-driven 3D tilt, a spotlight that tracks the
 * pointer, and a description that unfurls on hover (always visible on touch).
 */
export default function HouseCard({
  house,
  index,
}: {
  house: House;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // -0.5 → 0.5 across the card, in both axes.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };

  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-13, 13]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [11, -11]), spring);
  // Inner layers translate against the tilt to fake real depth.
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [18, -18]), spring);
  const shiftY = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), spring);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(45% 45% at ${gx}% ${gy}%, ${house.accentSoft} 0%, transparent 72%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx - 0.5);
    py.set(ny - 0.5);
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: EASE, delay: (index % 4) * 0.08 }}
      className="group relative w-full shrink-0 [perspective:1400px] lg:w-[clamp(320px,26vw,420px)]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
        className="preserve-3d glass hairline relative overflow-hidden rounded-sm p-7 transition-shadow duration-700 sm:p-8"
      >
        {/* Pointer-tracking glow */}
        <motion.div
          aria-hidden
          style={{ backgroundImage: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        {/* Accent rim that ignites on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${house.accent}66` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: house.accentSoft }}
        />

        <motion.div
          style={{ x: shiftX, y: shiftY }}
          className="relative preserve-3d"
        >
          <header className="flex items-start justify-between">
            <span className="font-body text-[10px] tracking-[0.3em] text-gold-100/35">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-display text-2xl leading-none transition-transform duration-700 group-hover:scale-110"
              style={{
                color: house.accent,
                textShadow: `0 0 26px ${house.accentSoft}`,
              }}
            >
              {house.sigil}
            </span>
          </header>

          {/* Crest plate */}
          <div
            className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[2px]"
            style={{
              background:
                "linear-gradient(150deg, rgba(18,26,49,0.9) 0%, rgba(3,4,10,0.95) 100%)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
              style={{
                background: `radial-gradient(55% 55% at 50% 45%, ${house.accent}2E 0%, transparent 72%)`,
              }}
            />
            <div className="absolute inset-2 border border-gold-300/10" />
            <p className="absolute inset-0 flex items-center justify-center px-5 text-center font-body text-[9px] uppercase leading-relaxed tracking-[0.2em] text-gold-100/45">
              {house.placeholder}
            </p>
          </div>

          <h3 className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.15rem)] font-medium leading-tight text-gold-50">
            {house.name}
          </h3>
          <p className="mt-2 font-body text-[10px] uppercase tracking-[0.24em] text-gold-100/40">
            {house.latin}
          </p>
          <p
            className="mt-4 font-display text-sm italic"
            style={{ color: house.accent }}
          >
            „{house.motto}“
          </p>

          {/*
            Description + traits: always readable on touch, and on desktop they
            unfurl from a collapsed state as the crest is hovered.
          */}
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="pt-5 font-body text-[13.5px] leading-[1.85] text-gold-50/60">
                {house.description}
              </p>

              <dl className="mt-6 space-y-3">
                {house.traits.map((trait) => (
                  <div key={trait.label} className="flex items-center gap-3">
                    <dt className="w-24 shrink-0 font-body text-[10px] uppercase tracking-[0.16em] text-gold-100/45">
                      {trait.label}
                    </dt>
                    <dd className="relative h-px flex-1 bg-gold-100/10">
                      <span
                        className="absolute inset-y-0 left-0 block origin-left transition-transform duration-[900ms] ease-out lg:scale-x-0 lg:group-hover:scale-x-100"
                        style={{
                          width: `${trait.value}%`,
                          background: `linear-gradient(90deg, ${house.accent} 0%, ${house.accent} 55%, transparent 100%)`,
                        }}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
