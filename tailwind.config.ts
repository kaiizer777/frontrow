import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F8FAFC",
        surface: "#FFFFFF",
        primary: {
          50: "#FFF5F1",
          100: "#FFE7DE",
          200: "#FFD0C2",
          300: "#FFA991",
          400: "#FF7752",
          500: "#FF5A36",
          600: "#F0441E",
          700: "#C72E0D",
          800: "#9E240B",
          900: "#7E200C",
          DEFAULT: "#FF5A36",
        },
        secondary: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          DEFAULT: "#0D9488",
        },
        accent: {
          amber: {
            50: "#FFFBEB",
            100: "#FEF3C7",
            500: "#F59E0B",
            600: "#D97706",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
