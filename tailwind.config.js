/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // 靛蓝色
          dark: '#4F46E5',
          light: '#818CF8',
        },
        secondary: {
          DEFAULT: '#8B5CF6', // 紫色
          dark: '#7C3AED',
          light: '#A78BFA',
        },
        accent: {
          DEFAULT: '#F97316', // 橙色
          dark: '#EA580C',
          light: '#FB923C',
        },
      },
    },
  },
  plugins: [],
} 