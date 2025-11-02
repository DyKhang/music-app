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
        "black-variable": "var(--black-variable)",
        "progressbar-active-bg": "var(--progressbar-active-bg)",
        "progressbar-player-bg": "var(--progressbar-player-bg)",
        "box-shadow-queue": "var(--box-shadow-queue)",
        "queue-player-popup-bg": "var(--queue-player-popup-bg)",
        "text-muted": "var(--text-muted)",
        "link-text-hover": "var(--link-text-hover)",
        "primary-bg": "var(--primary-bg)",
        "search-text": "var(--search-text)",
        "box-item-bg": "var(--box-item-bg)",
        "new-release-box-shadow": "var(--new-release-box-shadow)",
        "main-text-stroke": "var(--main-text-stroke)",
      },
    },
  },
  plugins: [],
};
