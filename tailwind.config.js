/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        'light-100': '#cecefb',
        'light-200': '#a8b5db',
        'gray-100': '#9ca4ab',
        'dark-100': '#0f0d23',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 