/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      fontFamily: {
        readex: ['Readex Pro', 'sans-serif'],
        shadows: ['Shadows Into Light', 'cursive'],
      },
      colors: {
        'amoure': '#EC1A1A',
        'fashion-doll': '#C3258D',
        'gummy': '#9917FF',
        'miracle': '#7350FC',
        'blue-berry': '#4C86F9',
        'coral': '#EF767A',
        'ceil-gray': '#29292c',
        'gray': '#1A1A1C',
        'white': '#F2EBE3',
      },
      animation: {
        rain: 'makeItRain 3s infinite linear',
      },
      keyframes: {
        makeItRain: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(250px)' },
        },
      },
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

