/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('./src/images/bg.jpg')",
      },
      colors: {
        "level-1": "#a2a2c8",
        "level-2": "#58b5d6",
        "level-3": "#58b5d6",
        "level-4": "#f0d25c",
        "level-5": "#e09f4f",
        "level-6": "#b283ae",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
