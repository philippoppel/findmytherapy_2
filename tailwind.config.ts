import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Palatino", "serif"],
        body: ["Optima", "Candara", "Segoe UI", "sans-serif"]
      },
      colors: {
        paper: "#fff5e9",
        ink: "#232323",
        orange: "#FE5000",
        lavender: "#d5b8fb",
        beige: "#fff5e9",
        yellow: "#dadb05",
        sea: "#FE5000",
        sun: "#dadb05",
        clay: "#d5b8fb",
        moss: "#232323",
        mist: "#fff5e9",
        blush: "#d5b8fb"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.08)",
        lift: "0 18px 45px rgba(15, 23, 42, 0.12)"
      },
      animation: {
        "fade-up": "fadeUp 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-in": "slideIn 0.3s ease-out"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateX(-50%) translateY(10px)" },
          "100%": { opacity: "1", transform: "translateX(-50%) translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
