/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        // Legacy palette kept for GSAP-animated components
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
        // New Gemini / Google brand palette
        gemini: {
          blue:   "#4285F4",
          green:  "#34A853",
          yellow: "#FBBC04",
          red:    "#EA4335",
        },
        dark: {
          900: "#050505",
          800: "#080808",
          700: "#0d0d0d",
          600: "#141414",
          500: "#1a1a1a",
          400: "#222222",
        },
      },
      backgroundImage: {
        "gemini-gradient": "linear-gradient(90deg, #4285F4, #34A853, #FBBC04, #EA4335)",
        "dark-glow-blue":  "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(66,133,244,0.15) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
