import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d8e5ff",
          200: "#b3cbff",
          300: "#88adff",
          400: "#5c86ff",
          500: "#3d63ff",
          600: "#2e4ae6",
          700: "#2539b4",
          800: "#1f328a",
          900: "#1c2a6b"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        card: "0 6px 18px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
