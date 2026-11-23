/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#263B36',
          dark: '#1C2C28',
          light: '#314C45',
        },
        sage: {
          DEFAULT: '#A8B8A0',
          dark: '#8E9F86',
          light: '#C7D3C1',
        },
        ivory: {
          DEFAULT: '#F3F0E8',
          dark: '#E7E2D5',
          light: '#FAF8F3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(38, 59, 54, 0.05), 0 1px 2px 0 rgba(38, 59, 54, 0.03)',
        'card': '0 4px 6px -1px rgba(38, 59, 54, 0.04), 0 2px 4px -1px rgba(38, 59, 54, 0.02)',
      }
    },
  },
  plugins: [],
}
