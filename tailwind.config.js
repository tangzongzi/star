/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          light: "hsl(var(--primary) / 0.9)",
          DEFAULT: "hsl(var(--primary))",
          dark: "hsl(var(--primary) / 1.1)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          light: "hsl(var(--secondary) / 0.9)",
          DEFAULT: "hsl(var(--secondary))",
          dark: "hsl(var(--secondary) / 1.1)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          light: "hsl(var(--accent) / 0.9)",
          DEFAULT: "hsl(var(--accent))",
          dark: "hsl(var(--accent) / 1.1)",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient": "gradient 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        }
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.2)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.125)',
        },
        '.glass-dark': {
          'background': 'rgba(0, 0, 0, 0.2)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.125)',
        },
        '.clay': {
          'background': 'var(--clay-background)',
          'border-radius': '24px',
          'box-shadow': '8px 8px 16px var(--clay-shadow-dark), -8px -8px 16px var(--clay-shadow-light)',
        },
        '.clay-pressed': {
          'box-shadow': 'inset 8px 8px 16px var(--clay-shadow-dark), inset -8px -8px 16px var(--clay-shadow-light)',
        },
      })
      const newUtilities = {
        '.backdrop-blur-2xl': {
          'backdrop-filter': 'blur(40px)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} 