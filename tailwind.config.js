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
    require('@headlessui/tailwindcss')
  ],
  daisyui: {
    themes: [{
      custom: {
        "--rounded-box": "0.15rem",
        "--rounded-btn": "0.05rem",
        "--rounded-badge": "0.15rem",
        "--animation-btn": "0.1s",
        "--animation-input": "0.08s",
        "--btn-focus-scale": "0.98",
        "--border-btn": "1.5px",
        "--tab-border": "1.5px",
        "--tab-radius": "0.15rem",
        "primary": "#273c75",
        "secondary": "#3e528d",
        "accent": "#84a5c5",
        "neutral": "#4e5667",
        "base-100": "#fafafa",
        "info": "#273c75",
        "success": "#3e528d",
        "warning": "#84a5c5",
        "error": "#e74c3c"
      }
    }]
  }
};
