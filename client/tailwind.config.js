const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDelay: {
        0: "0ms",
        2000: "2000ms",
      },
      maxHeight: {
        "4/5": "80%",
      },
      minWidth: {
        firstEntry: "130px",
        secondEntry: "130px",
      },
      colors: {
        status: {
          Declined: "#F34925",
          Acknowledged: "#25F376",
          Unacknowledged: "#B0C1C6",
        },
        actives: {
          checked: {
            dark: "#7d85bd",
          },
        },
        peach: {
          light: "#f7c2a3",
          dark: "#fd5070",
        },
        background: {
          lighter: "#d2dce0",
          light: "#75AABC",
          dark: "#173E43",
          seeThrough: "hsla(293, 75%, 0%, 0.33)",
        },
      },
      animation: {
        errorShake: "shakeKeyframe 1s ease-in-out",
      },
      keyframes: {
        shakeKeyframe: {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(-1deg)",
          },
          "75%": {
            transform: "rotate(1deg)",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { height: "auto", width: "auto" },
        p: { height: "auto", width: "auto" },
      });
    }),
  ],
};
