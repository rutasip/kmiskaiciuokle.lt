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
        'navy-blue': '#0D47A1',
        'bright-yellow': '#FFEB3B',
        'pale-yellow': '#FFF176',
        'amber-400': '#FFC107',
        'amber-500': '#FFB300',
        'main': '#F5F5F5',
        'secondary': '#FAFAFA',
        'accent': '#4169E1',
      },
      maxWidth: {
        '8xl': '88rem',
      }
    },
    fontSize: {
      'medium': ['16px'],
      'xl': ['21px'],
      '4xl': ['33px', {
        lineHeight: '50px',
        fontWeight: '700',
      }],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
