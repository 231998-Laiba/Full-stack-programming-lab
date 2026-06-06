/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        navy: {
          950: '#020817',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        brand: {
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
          light: '#93c5fd',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease forwards',
        'fade-up': 'fadeUp 0.4s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        slideIn: { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.4)' }, '50%': { boxShadow: '0 0 20px 6px rgba(59,130,246,0.2)' } }
      }
    },
  },
  plugins: [],
}
