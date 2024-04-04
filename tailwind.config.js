const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)']
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require("daisyui"),
    require('@headlessui/tailwindcss'),
    require('tailwindcss-animated')
  ],
  daisyui: {
    themes: [{
      custom: {
        "--rounded-box": "0.4rem",
        "--rounded-btn": "0.3rem",
        "--rounded-badge": "0.4rem",
        "--animation-btn": "0.4s",
        "--animation-input": "0.25s",
        "--btn-focus-scale": "0.92",
        "--border-btn": "3px",
        "--tab-border": "3px",
        "--tab-radius": "0.4rem",
        "primary": "#3c2d75",
        "secondary": "#4e5667",
        "accent": "#756d84",
        "neutral": "#fafafa",
        "base-100": "#fff",
        "info": "#273c75",
        "success": "#3e528d",
        "warning": "#84a5c5",
        "error": "#e74c3c"
      }
    }]
  }
};
