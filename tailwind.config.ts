import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-prompt)', 'var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f6fe',
          100: '#ddeafe',
          200: '#c2dbfd',
          300: '#97c4fb',
          400: '#64a3f7',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#111e48',
        },
        modtanoy: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        wealth: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        }
      },
      boxShadow: {
        'glow-brand': '0 0 25px -5px rgba(37, 99, 235, 0.25)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
};

export default config;
