 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-100": "#00BFFF",
        "primary-200": "#1E90FF",
        "secondary-100": "#0b1a78",
        "secondary-200": "#d2691e",
        "secondary-300" :"#9a5626"
      }
    },
  },
  plugins: [],
}