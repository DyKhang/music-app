/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadowColor: {
        playListSideBar:
          "0 1px 0 rgba(0,0,0,0.3),0 1px 6px rgba(0,0,0,0.3),inset 0 1px 1px hsla(0,0%,100%,0.3)",
        filterTag: "0 2px 8px 0 rgba(0,0,0,.2)",
      },
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
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": " translateX(-500px);",
            transform: "translateX(-500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": " translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": " translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left2":
          "slide-left2 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [],
};
