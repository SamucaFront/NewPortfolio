/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050607',
          900: '#0a0c0e',
          800: '#101316',
          700: '#161a1e',
          600: '#1f252b',
        },
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--accent) / 0.35), 0 0 32px -6px rgb(var(--accent) / 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        caret: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(6px,-12px) rotate(4deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        caret: 'caret 1s steps(1) infinite',
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
