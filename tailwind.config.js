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
        "primary": "#d6e1f8",
        "secondary": "#b7d4f9",
        "accent": "#9ec2e3",
        "neutral": "#e6e6e6",
        "base-100": "#fff",
        "info": "#c6e6ff",
        "success": "#d6f2e0",
        "warning": "#ffe0b3",
        "error": "#ffb6c1"
      }
    }]
  }
};
