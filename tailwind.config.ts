import type { Config } from "tailwindcss";

/**
 * Palette and scale extracted from santionispirits.com — see
 * docs/research/santionispirits/DESIGN-SPEC.md. Monochrome ink on grained
 * paper, plus exactly one spot colour per section.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F2F1EF",
          dim: "#E7E5E1",
          bright: "#FAFAF8",
        },
        ink: {
          DEFAULT: "#0E0E0E",
          soft: "#262626",
          night: "#1C1C1C",
        },
        /* The treasure's own colour — printed, not glowing */
        ochre: {
          DEFAULT: "#B08D57",
          light: "#C4A264",
          deep: "#8A6A3C",
        },
        oxblood: "#6E2020",
        signal: "#CF2A20",
        liquid: "#3FA9E0",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "var(--font-serif)",
          "Georgia",
          "serif",
        ],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        caption: "0.06em",
        label: "0.14em",
        wide2: "0.22em",
      },
      keyframes: {
        puckPulse: {
          "0%,100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.92" },
        },
        tickDrift: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(300%)" },
        },
      },
      animation: {
        puckPulse: "puckPulse 2.6s ease-in-out infinite",
        tickDrift: "tickDrift 2.4s cubic-bezier(0.6,0,0.4,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
