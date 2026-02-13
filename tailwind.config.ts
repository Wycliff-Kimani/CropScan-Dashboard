/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ag-green": {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#166534",
          800: "#15803d",
          900: "#145231",
        },
        "ag-earth": {
          50: "#faf9f7",
          100: "#f3ede8",
          200: "#e7dcd0",
          300: "#d4bfa3",
          400: "#b39d7f",
          500: "#9b8568",
          600: "#7d6a54",
          700: "#6b5843",
          800: "#5a4a36",
          900: "#4a3a28",
        },
      },
      boxShadow: {
        "sm-ag": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        ag: "0 1px 3px 0 rgba(22, 101, 52, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "md-ag": "0 4px 6px -1px rgba(22, 101, 52, 0.1)",
        "lg-ag": "0 10px 15px -3px rgba(22, 101, 52, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
