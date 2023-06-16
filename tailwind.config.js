/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "grey1": "#E5E5E5"
      },
    },
    fontSize: {
      xs: ['12px'],
      sm: ['14px'],
      base: ['16px'],
      lg: ['18px'],
      xl: ['20px'],
      '2xl': '24px',
      '3xl': '28px',
    }
  },
  plugins: [],
}

