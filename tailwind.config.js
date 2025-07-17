/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#df7401",
        secondary: "#2b2a29",
        para: "#787878",
      },
      placeholderColor: {
        primary: "#3490dc",
      },
      fontFamily: {
        primary_font: "Poppins",
        secondary_font: "srilanka",
        pri_head: ["Rubik", "sans-serif"],
        pri_para: ["Jost", "sans-serif"],
        title: ["Satisfy", "cursive"],
      },
    },
  },
  plugins: [],
};
