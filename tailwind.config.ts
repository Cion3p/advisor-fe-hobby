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
        serif: [
          'var(--font-cormorant)',
          'var(--font-playfair)',
          'var(--font-noto-serif-thai)',
          'Cormorant Garamond',
          'Playfair Display',
          'Georgia',
          'serif',
        ],
        sans: [
          'var(--font-inter)',
          'var(--font-noto-sans-thai)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          'JetBrains Mono',
          'Geist Mono',
          'ui-monospace',
          'monospace',
        ],
      },
      colors: {
        // Luxury Palette from taste_v2.md
        obsidian: {
          950: '#0c0b0a',
          900: '#121110',
          800: '#171615',
          700: '#23211f',
        },
        ivory: {
          50: '#fcfbf7',
          100: '#f5f4ef',
          200: '#eceae3',
          300: '#dedad0',
        },
        gold: {
          50: '#faf7ed',
          100: '#f4ebd2',
          200: '#ead7a5',
          300: '#dfc278',
          400: '#d4af37',
          500: '#c5a059',
          600: '#a88241',
          700: '#876532',
        },
        bronze: {
          500: '#8c6d46',
          600: '#735735',
        },
        // Brand & Stone backward compatibility
        brand: {
          50: '#fcfbf7',
          100: '#f5f4ef',
          200: '#eceae3',
          300: '#dedad0',
          400: '#c5a059',
          500: '#a88241',
          600: '#171615',
          700: '#121110',
          800: '#0c0b0a',
          900: '#0c0b0a',
        },
      },
      letterSpacing: {
        'luxury': '0.25em',
        'subtle-wide': '0.15em',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
