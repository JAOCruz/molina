/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
          cormorant: ['"Cormorant Garamond"', 'serif'],
        },
      },
    },
    plugins: [],
  };