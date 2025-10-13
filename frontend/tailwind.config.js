/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ⬇️ THIS IS THE IMPORTANT PART ⬇️
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // ⬆️ ENSURES TAILWIND SCANS YOUR REACT FILES ⬆️
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}