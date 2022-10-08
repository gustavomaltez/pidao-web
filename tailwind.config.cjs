/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Mulish', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#174666',
        'gray': {
          '100': '#F4F5F7',
          '200': '#DEE2E6',
          '300': '#8D8D8D',
          '400': '#737F8B',
          '600': '#484848',
          '700': '#404040',
          '800': '#1F1F1F',
        },
        'aux': '#F5D111'
      }
    },
  },
  plugins: [],
};
