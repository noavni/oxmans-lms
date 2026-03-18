import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "teal-light": "#5ecfcf",
        "teal-mid":   "#2da8c8",
        "blue-deep":  "#1a6fa8",
        purple:       "#6b3fa0",
        magenta:      "#c04fa0",
        pink:         "#e060a8",
        "orange-red": "#e84830",
        coral:        "#f06040",
        page:         "#fafaf8",
        section:      "#f4f3ef",
        ink:          "#0f0e0c",
        "ink-mid":    "#3a3832",
        "ink-subtle": "#7a7670",
        rule:         "#e4e2dc",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #5ecfcf 0%, #1a6fa8 25%, #6b3fa0 55%, #e060a8 80%, #e84830 100%)",
        "brand-gradient-subtle":
          "linear-gradient(135deg, rgba(94,207,207,0.15) 0%, rgba(26,111,168,0.15) 25%, rgba(107,63,160,0.15) 55%, rgba(224,96,168,0.15) 80%, rgba(232,72,48,0.15) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
