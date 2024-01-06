/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        light: "#F8F8F8",
        "sky-blue": {
          100: "#e0f4f7",
          200: "#d0e8ee",
          400: "#b5d8de",
          700: "#002634",
          750: "#011d27",
          800: "#00151a",
        },
        teal: {
          100: "#4e99a9",
          200: "#dff2ff",
          600: "#01657d",
          700: "#005366",
        },
        "deeper-sea-blue": "#001519",
        "rich-navy": "#001b23",
        "light-beige": "#f8e7d1",
        "deep-navy-blue": "#001f3f",
        "level-1": "#a2a2c8",
        "level-2": "#58b5d6",
        "level-3": "#58b5d6",
        "level-4": "#f0d25c",
        "level-5": "#e09f4f",
        "level-6": "#b283ae",
      },
      height: {
        hwh: "calc(100vh - 104px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
