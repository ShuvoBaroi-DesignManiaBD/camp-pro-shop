/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#482f21",
        "primaryLight": "#ECDDD5",
        "PrimaryDark": "#1C120D",
        "secondary": "#ba986a",
        "secondaryExtraLight": "#ECE2D5",
        "secondaryLight": "#ffd497",
        "secondaryDark": "#6D5336",
        "text": "#0E0906",
        "bg": "#ECDDD5",
      }
    },
  },
  plugins: [],
}