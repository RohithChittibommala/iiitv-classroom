/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Inter", "Georgia", "sans-serif"],
      monserrat: ["Montserrat", "serif"],
    },
    ripple: (theme) => ({
      colors: theme("colors"),
    }),

    extend: {},
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
      inset: ["hover", "focus", "group-hover"],
      transform: ["group-hover", "hover"],
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("@tailwindcss/line-clamp"),
  ],
};
