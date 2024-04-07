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
        "--animation-input": "0.22s",
        "--btn-focus-scale": "0.94",
        "--border-btn": "2.5px",
        "--tab-border": "2.5px",
        "--tab-radius": "0.3rem",
        "primary": "#eb00ff",
        "secondary": "#00fced",
        "accent": "#00eaff",
        "neutral": "#121212",
        "base-100": "#212b3f",
        "info": "#009eff",
        "success": "#00d796",
        "warning": "#ffa440",
        "error": "#ff0048"
      }
    }]
  }
};
