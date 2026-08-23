/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#11151c',
          900: '#171c26',
          800: '#1f2530',
          700: '#2a3140',
        },
        paper: {
          50: '#f7f4ee',
          100: '#efe9dc',
          200: '#e1d8c2',
        },
        // Universal accent — CTAs, links, hover states
        accent: {
          400: '#e88a54',
          500: '#df753a',
          600: '#c05f29',
        },
        // The three disciplines — used consistently for tags, category
        // labels and skill groups across About and Work
        role: {
          software: '#2fae82',
          'software-deep': '#1f8f68',
          chain: '#d9a441',
          'chain-deep': '#a97918',
          ai: '#9b87f5',
          'ai-deep': '#6d54d6',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Arial Narrow', 'sans-serif'],
        body: ['"IBM Plex Sans"', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
