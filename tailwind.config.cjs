// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          20: "#F8F4EB",
          50: "#EFE6E6",
          100: "#DFCCCC",
          500: "#5E0000",
        },
        primary: {
          100: "#FFE1E0",
          300: "#FFA6A3",
          500: "#FF6B66",
        },
        secondary: {
          400: "#FFCD5B",
          500: "#FFC132",
        },
      },
      backgroundImage: {
        "gradient-yellowred": "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
