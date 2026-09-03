"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Coin = {
  /** Origin offset from the burst centre, in normalised units */
  ox: number;
  oy: number;
  /** Direction + distance travelled once the treasure shatters */
  dx: number;
  dy: number;
  depth: number; // 0.35 – 1 : parallax + size + opacity
  radius: number;
  tilt: number;
  spin: number;
  phase: number;
  drift: number;
};

type Props = {
  /**
   * Live 0 → 1 shatter progress. Written by GSAP/Framer outside of React so
   * the canvas never re-renders the component tree.
   */
  progress: MutableRefObject<number>;
  count?: number;
  /** Vertical origin of the hoard, 0 (top) → 1 (bottom) of the canvas */
  originY?: number;
  /**
   * "band" scatters the coins in a wide, flat drift along the horizon;
   * "orb" packs them into a compact hoard.
   */
  shape?: "band" | "orb";
  className?: string;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * The shattering treasure, rendered on a single canvas.
 *
 * At progress 0 the coins are packed into a glowing core; as progress climbs
 * they explode outward, spin, fall under gravity and fade — one continuous
 * motion scrubbed by the page scroll.
 */
export default function CoinField({
  progress,
  count = 150,
  originY = 0.46,
  shape = "orb",
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    // Thin the field out on small screens — it is decorative, not content.
    const total = window.innerWidth < 768 ? Math.round(count * 0.5) : count;

    // A band lies low and wide; an orb is compact in both axes.
    const spreadX = shape === "band" ? 0.42 : 0.085;
    const spreadY = shape === "band" ? 0.035 : 0.085;

    const coins: Coin[] = Array.from({ length: total }, () => {
      const angle = rand(0, Math.PI * 2);
      // sqrt keeps the initial cluster evenly dense rather than centre-heavy
      const seed = Math.sqrt(Math.random());
      return {
        ox: Math.cos(angle) * seed * spreadX,
        oy: Math.sin(angle) * seed * spreadY,
        dx: Math.cos(angle) * rand(0.3, 1.15) + rand(-0.18, 0.18),
        dy: Math.sin(angle) * rand(0.1, 0.4) - rand(0.45, 1.15),
        depth: rand(0.35, 1),
        radius: rand(5, 15),
        tilt: rand(0, Math.PI),
        spin: rand(0.6, 2.4) * (Math.random() > 0.5 ? 1 : -1),
        phase: rand(0, Math.PI * 2),
        drift: rand(0.4, 1.5),
      };
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCoin = (
      x: number,
      y: number,
      r: number,
      tilt: number,
      flip: number,
      alpha: number,
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(tilt);
      // Squashing X simulates the coin turning edge-on as it spins.
      ctx.scale(Math.max(0.06, Math.abs(Math.cos(flip))), 1);

      const grad = ctx.createRadialGradient(
        -r * 0.35,
        -r * 0.4,
        r * 0.1,
        0,
        0,
        r,
      );
      grad.addColorStop(0, "#FDF6E3");
      grad.addColorStop(0.42, "#EAC46B");
      grad.addColorStop(0.78, "#C08F2C");
      grad.addColorStop(1, "#6F4E14");

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.lineWidth = Math.max(0.6, r * 0.09);
      ctx.strokeStyle = "rgba(253,246,227,0.55)";
      ctx.stroke();

      // Inner ring detail, only worth drawing on the larger coins
      if (r > 7) {
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(111,78,20,0.5)";
        ctx.lineWidth = Math.max(0.5, r * 0.07);
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = (time: number) => {
      const t = time / 1000;
      const p = Math.min(Math.max(progress.current, 0), 1);
      // Ease-out so the burst is violent at the start and settles late.
      const burst = 1 - Math.pow(1 - p, 2.2);

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const cx = width / 2;
      const cy = height * originY;
      const reach = Math.max(width, height) * 0.85;

      // The intact treasure core dissolves as the coins scatter.
      const coreAlpha = Math.max(0, 1 - p * 2.4);
      if (coreAlpha > 0.01) {
        const squash = shape === "band" ? 0.22 : 1;
        const radius = reach * (shape === "band" ? 0.52 : 0.28);
        const core = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        core.addColorStop(0, `rgba(253,246,227,${0.3 * coreAlpha})`);
        core.addColorStop(0.35, `rgba(234,196,107,${0.17 * coreAlpha})`);
        core.addColorStop(1, "rgba(234,196,107,0)");

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, squash);
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (const c of coins) {
        const travel = burst * c.depth;
        // Idle bob keeps the core alive before the scroll starts.
        const idle = Math.sin(t * c.drift + c.phase) * (6 + c.depth * 8);

        const x =
          cx + c.ox * reach + c.dx * travel * reach + idle * (1 - burst * 0.8);
        const y =
          cy +
          c.oy * reach +
          c.dy * travel * reach +
          // Gravity: quadratic fall once the coins are loose.
          Math.pow(burst, 2) * reach * 1.05 * c.depth +
          idle * 0.4;

        if (y - c.radius > height + 40 || x < -70 || x > width + 70) continue;

        const alpha = (0.35 + c.depth * 0.65) * (1 - burst * 0.35);
        drawCoin(
          x,
          y,
          c.radius * c.depth,
          c.tilt + travel * 1.6 * c.spin,
          t * c.spin + c.phase,
          alpha,
        );
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(render);
    };

    resize();

    if (reduced) {
      // One static, composed frame — no loop, no motion.
      render(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, originY, progress, reduced, shape]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
