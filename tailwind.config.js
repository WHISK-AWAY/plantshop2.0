/** @type {import('tailwindcss').Config} */
export default {
  content: ['/src/index.html', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      fraunces: ['Fraunces', 'serif'],
      raleway: ['Raleway', 'sans-serif'],
      gloock: ['Gloock', 'serif'],
      outfit: ['Outfit', 'sans-serif'],
      montserrat: ['Montserrat', 'monospace'],
      hubbali: ['Hubballi', 'sans-serif'],
      tabac: ['Tabac Big Glam Black', 'sans-serif'],
      osvald: ['Osvald', 'sans-serif'],
      quicksand: ['Quicksand', 'sans-serif'],
      archivo: ['Archivo Black', 'monospace'],
      josefin: ['Josefinn Sans', 'monospace'],
      chonburi: ['Chonburi', 'monospace'],
      fam: ['Familjen Grotesk', 'sans-serif'],
      marcellus: ['Marcellus', 'serif'],
    },
    fontWeight: {
      thin: 100,
      xtralight: 200,
      light: 300,
      'medium-light': 400,
      medium: 500,
      semibold: 600,
      'medium-bold': 700,
      bold: 800,
      black: 900,
    },
    extend: {
      colors: {
        'primary-deep-green': '#365314',
        'primary-promo-banner': '#a7bfb4',
        'primary-button-green': '#283F3B',
        'primary-offwhite': '#f4f4f4',
        'primary-bright-white': '#FFFFFF',
        'primary-button-hover': '#4d783c',
        'green-gray': '#354f52',
        'btn-hover': '#283f3b',
      },
      display: ['group-hover'],
      screens: {
        'short':   {'raw': '(max-height: 768px) and (min-width: 1440px)'} ,
        // 'grande': {'raw': '(max-height: 360px)'},
        // 'grande-tall': {'raw': '(max-height: 375px)'},
        // 'tall': {'raw': '(max-height: 428px)'},
        xxs: '360px',
        xs: '375px',
        sm: '412px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
        '4xl': '1920px',
        '5xl': '2560px',
        '6xl': '3440px',
        '7xl': '3840px'
      },
    },
  },
  plugins: [],
};
