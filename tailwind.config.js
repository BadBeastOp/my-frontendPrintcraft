/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["'Satoshi'", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#FF5C00",
          "orange-light": "#FF8040",
          "orange-dark": "#CC4900",
          purple: "#7B2FFF",
          "purple-light": "#9D5FFF",
        },
        dark: {
          950: "#060608",
          900: "#0C0C12",
          800: "#13131C",
          700: "#1A1A28",
          600: "#222236",
          500: "#2E2E48",
        },
        neutral: {
          50: "#F8F8FC",
          100: "#EFEFFA",
          200: "#D8D8F0",
          300: "#B8B8DC",
          400: "#8888B0",
          500: "#606088",
          600: "#484868",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #FF5C00 0%, #7B2FFF 100%)",
      },
      boxShadow: {
        "glow-orange": "0 0 40px rgba(255, 92, 0, 0.3)",
        card: "0 4px 40px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
