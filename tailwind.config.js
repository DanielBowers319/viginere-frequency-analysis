import scrollbarPlugin from 'tailwind-scrollbar'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hacker: ['VT323', 'monospace']
      },
      animation: {
        fadeInSlide: 'fadeInSlide 3s ease-in-out'
      },
      keyframes: {
        fadeInSlide: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          }
        }
      }
    },
  },
  plugins: [
    scrollbarPlugin
  ],
}

