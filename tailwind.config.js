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
        },
        remove: {
          '0%': { transform: 'translateY(0%);', opacity: '100' },
          '100%': { transform: 'translateY(80%);', opacity: '0' },
        },
        toastAppend: {
          '0%': { transform: 'translateY(-100%);', opacity: '0' },
          '100%': { transform: 'translateY(0%);', opacity: '100' },
        },
        toastRemove: {
          '0%': { transform: 'translateX(0%);', opacity: '100' },
          '100%': { transform: 'translateX(100%);', opacity: '0' },
        }
      },
      animation: {
        append: 'append .3s linear',
        remove: 'remove .3s linear',
        toastAppend: 'toastAppend .3s linear',
        toastRemove: 'toastRemove .2s ease-in',
      }
    },
  },
  plugins: [],
}