/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '68': '17rem',
        '74': '22rem',
      },
      colors: {
        'theme-indigo': '#3F51B5',
        'theme-denim': '#1560BD',
        'theme-air-force': '#5D8AA8',
        'navy-blue': '#5D8AA8',
        'bright-yellow': '#FFEB3B',
        'pale-yellow': '#FFF176',
        'amber-400': '#FFC107',
        'amber-500': '#FFB300',
        'primary': '#5D8AA8',
        'light-neutral': '#F7F9FC',
        'secondary': '#A3C1DA',
        // 'accent': '#E74C3C',
        // 'accent': '#D1495B',
        'accent': '#C62828',
        'on-accent': '#ffffff',
      },
      maxWidth: {
        '8xl': '88rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
