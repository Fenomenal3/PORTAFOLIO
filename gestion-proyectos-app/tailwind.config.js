export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT: '#2563EB', hover: '#1D4ED8' },
        danger:   { DEFAULT: '#DC2626', hover: '#B91C1C' },
        success:  { DEFAULT: '#16A34A', hover: '#15803D' },
        warning:  { DEFAULT: '#D97706' },
      },
    },
  },
  plugins: [],
};