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
        "purple-primary": "var(--purple-primary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-item-hover": "var(--text-item-hover)",
        "layout-bg": "var(--layout-bg)",
        "sidebar-bg": "var(--sidebar-bg)",
        "navigation-text": "var(--navigation-text)",
        "alpha-bg": "var(--alpha-bg)",
        "border-primary": "var(--border-primary)",
        black: "var(--black)",
      },
    },
  },
  plugins: [],
};
