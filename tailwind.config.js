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
        "--rounded-box": "0.3rem",
        "--rounded-btn": "0.2rem",
        "--rounded-badge": "0.3rem",
        "--animation-btn": "0.3s",
        "--animation-input": "0.2s",
        "--btn-focus-scale": "0.94",
        "--border-btn": "2.5px",
        "--tab-border": "2.5px",
        "--tab-radius": "0.3rem",
        "primary": "#00be93",
        "secondary": "#005fff",
        "accent": "#00efff",
        "neutral": "#0e101f",
        "base-100": "#fffbf6",
        "info": "#0083c5",
        "success": "#008a6a",
        "warning": "#ffd000",
        "error": "#ff4c75"
      }
    }]
  }
};
