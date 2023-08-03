/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "very-dark-gray": "hsl(0, 0%, 17%)",
        "dark-gray": "hsl(0, 0%, 59%)",
      },
      fontSize: {
        base: "18px", // Set the default font size to 18px
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"], // Set the default font to Rubik
      },
    },
  },
  plugins: [],
};
