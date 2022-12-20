/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        append: {
          '0%': { transform: 'translateY(80%);', opacity: '0' },
          '100%': { transform: 'translateY(0%);', opacity: '100' },
        }
      },
      animation: {
        append: 'append .3s linear',
      }
    },
  },
  plugins: [],
}