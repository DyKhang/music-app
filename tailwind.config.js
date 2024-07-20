/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(117deg, #5a4be7, #c86dd7 102%)",
      },
    },
  },
  plugins: [],
};
