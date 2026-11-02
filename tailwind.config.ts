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
        charcoal: {
          DEFAULT: "#171411",
          900: "#100D0B",
          800: "#171411",
          700: "#221C18",
          600: "#2F2722",
        },
        ivory: {
          DEFAULT: "#F8F3E9",
          50: "#FFFFFF",
          100: "#FAF7F0",
          200: "#F8F3E9",
          300: "#EFE6D5",
          400: "#E3D5BE",
        },
        maroon: {
          DEFAULT: "#681F2B",
          900: "#45121B",
          800: "#571822",
          700: "#681F2B",
          600: "#802735",
          500: "#9C3041",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#DFC38A",
          dark: "#A3803C",
          muted: "#96783A",
        },
        wood: {
          DEFAULT: "#30231D",
          light: "#45332B",
          dark: "#201713",
        },
        marigold: {
          DEFAULT: "#E08A1E",
          hover: "#C97715",
        },
        banana: {
          DEFAULT: "#4E6B3A",
          dark: "#3B522C",
          light: "#678A4F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "Mukta", "sans-serif"],
        telugu: ["var(--font-telugu)", "Noto Sans Telugu", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "draw-kolam": "drawKolam 1.8s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drawKolam: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
