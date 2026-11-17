import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { ink: '#09090B', cyan: '#00F2FE', rose: '#FF0050' }, fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], display: ['var(--font-jakarta)', 'sans-serif'] }, boxShadow: { glow: '0 0 44px rgba(0,242,254,.12)' }, backgroundImage: { 'accent-gradient': 'linear-gradient(110deg, #00F2FE 0%, #FF0050 100%)' } } },
  plugins: [],
};
export default config;
