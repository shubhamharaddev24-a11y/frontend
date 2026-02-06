/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fef7ed',
        warmBrown: '#78350f',
        studioOrange: '#ea580c',
      },
    },
  },
  plugins: [],
}

