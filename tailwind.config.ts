import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        sand: {
          50:  '#faf8f5',
          100: '#f5f0e8',
          200: '#ede5d8',
          300: '#ddd5c8',
          400: '#c8bfb0',
          500: '#b5a898',
          600: '#9c8e7e',
          700: '#7a6e61',
          800: '#5a5249',
          900: '#3d3830',
        },
        ink: '#1a1523',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up':     'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':     'fadeIn 0.5s ease-out forwards',
        'hero-reveal': 'heroReveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'orb-float':   'orbFloat 16s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        heroReveal: {
          '0%':   { transform: 'translateY(108%)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(16px, -22px) scale(1.03)' },
          '66%':      { transform: 'translate(-12px, 14px) scale(0.97)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
