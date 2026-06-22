import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17213D",
        muted: "#6D7691",
        primary: "#5B50E6",
        violet: "#7665EE",
        surface: "#F6F7FB",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(35, 39, 83, 0.08)",
        card: "0 8px 25px rgba(49, 52, 91, 0.07)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
