import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Deep mystical night */
        abyss: {
          950: "#03040A",
          900: "#05070F",
          800: "#080B18",
          700: "#0C1122",
          600: "#121A31",
          500: "#1A2444",
        },
        /* Treasure gold */
        gold: {
          50: "#FDF6E3",
          100: "#F8E9C1",
          200: "#F2D999",
          300: "#EAC46B",
          400: "#D9AC46",
          500: "#C08F2C",
          600: "#9A6E1E",
          700: "#6F4E14",
          800: "#48310D",
          900: "#2A1C07",
        },
        ember: "#E0653A",
        arcane: "#6E8BFF",
      },
      fontFamily: {
        // The display face has no Latin alphabet, so the serif behind it picks
        // up Latin, symbols and anything else it is missing.
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
        widest2: "0.32em",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(217,172,70,0.55)",
        "glow-lg": "0 0 140px -20px rgba(217,172,70,0.6)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(100deg, #6F4E14 0%, #EAC46B 22%, #FDF6E3 40%, #EAC46B 58%, #9A6E1E 78%, #EAC46B 100%)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(217,172,70,0.22) 0%, rgba(217,172,70,0) 68%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
        scrollDotX: {
          "0%": { transform: "translateX(-120%)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateX(420%)", opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        scrollDotX: "scrollDotX 2.4s cubic-bezier(0.6,0,0.4,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
