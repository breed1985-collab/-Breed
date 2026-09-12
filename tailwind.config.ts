import type { Config } from "tailwindcss";

// Single source of truth for the COACH B brand system.
// Change colors/fonts here — never hardcode hex values in components.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#141414",
        surface: "#1a1a1a",
        footer: "#0d0d0d",
        gold: {
          DEFAULT: "#D4A24E",
          light: "#e0b876",
          dark: "#b8873a",
        },
        berry: {
          DEFAULT: "#8B1E3F",
          light: "#a52a4d",
          dark: "#6b1730",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        serif: ["var(--font-display)", "serif"],
      },
      backgroundImage: {
        "berry-wash":
          "radial-gradient(ellipse at top, rgba(139,30,63,0.35) 0%, rgba(20,20,20,0) 60%), linear-gradient(to bottom, #141414 0%, rgba(139,30,63,0.12) 45%, #141414 100%)",
        "hero-overlay":
          "linear-gradient(to bottom, rgba(20,20,20,0.35) 0%, rgba(20,20,20,0.55) 50%, rgba(20,20,20,0.95) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
