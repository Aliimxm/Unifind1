/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#111311",
        surface: "#202420",
        primary: "#b7ff8a",
        secondary: "#596351",
        accent: "#a8ff78",
        text: "#eff5e9",
        muted: "#a0aa98",
      },
      fontFamily: {
        sans: ["VT323", "monospace"],
        pixel: ["Silkscreen", "monospace"],
      },
    },
  },
  plugins: [],
};
