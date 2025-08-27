import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        faith: {
          blue: "#2B6CB0",
          gold: "#FFD700",
          emerald: "#2F855A",
          dark: "#0D0D0D",
          light: "#F7FAFC",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-faith": "linear-gradient(135deg, #2B6CB0 0%, #63B3ED 100%)",
        "gradient-dark": "linear-gradient(135deg, #0D0D0D 0%, #1A202C 100%)",
      },
    },
  },
  plugins: [],
};
export default config; 