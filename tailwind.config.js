/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        robo: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(117deg, #5a4be7, #c86dd7 102%)",
      },
      boxShadow: {
        "shadow-popover": "0 0 5px 0 rgba(0, 0, 0, .2)",
      },
      backgroundColor: {
        "button-slider": "hsla(0,0%,100%, 0.15)",
      },
      colors: {
        "purple-primary": "rgb(var(--purple-primary) / <alpha-value>)",
        "text-item-hover": "rgb(var(--text-item-hover) / <alpha-value>)",
        "layout-bg": "rgb(var(--layout-bg) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
