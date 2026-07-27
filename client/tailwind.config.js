/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfdf5",
          100: "#d1f2e4",
          200: "#a8e6c9",
          400: "#34a870",
          500: "#1f8a57",
          600: "#0f6b41",
          700: "#0a4f30",
          900: "#06301d",
        },
        secondary: {
          50: "#fffdf7",
          100: "#fdf6e3",
          200: "#f5ecc9",
          400: "#e8dcae",
          500: "#d4c48a",
          600: "#b8a568",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};