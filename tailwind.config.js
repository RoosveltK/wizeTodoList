/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5E9DD4',
        'primary-2': '#4A90E2',
        'primary-3': '#E9F4FF',
        secondary: '#6a4e77',
        success: '#219653',
        danger: '#D34053',
        warning: '#FFA70B',
        info:'#259AE6'
      },
    },
  },
  plugins: [],
}