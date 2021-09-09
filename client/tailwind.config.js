const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      dark: {
        DEFAULT: "#1f2125",
        secondary: "#282a2c",
        font: {
          DEFAULT: "#d2d1d4",
          heading: "#FFFFFF",
          secondary: "#F3F4F6",
        },
        border: "#333333",
        input: "#444444",
      },
      light: {
        DEFAULT: "#FFFFFF",
        secondary: "#F3F4F6",
        font: {
          DEFAULT: "#55565a",
          heading: "#2b3036",
          secondary: "#c6c7c9",
        },
        border: "#E5E7EB",
        input: "#d5d7da",
      },
      primary: {
        light: "#3395d6",
        DEFAULT: "#0078d4",
        dark: "#00558f",
      },
      secondary: {
        light: "#FF7F50",
        DEFAULT: "#FF6347",
        dark: "#FF4500",
      },
      error: "#EF4444",
      warning: "#F59E0B",
      success: "#10B981",
      info: "#3B82F6",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
