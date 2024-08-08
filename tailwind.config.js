const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/app/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        previewSquareWidth: '150px',
      },
      height: {
        previewSquareHeight: '150px',
      },
      boxShadow: {
        custom: '0 8px 12px 6px rgba(0, 0, 0, 0.15)',
        customLight: '0 4px 4px 0 rgba(0, 0, 0, 0.30)',
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "hsl(var(--ring))",
        dialog: {
          background: "var(--dialog-background)",
        },
        background: "var(--background)",
        tabBG: "var(--tab-background-color)",
        switchBG: "var(--switch-bg-color)",
        switchBGDefault: "var(--switch-bg-color-default)",
        switchBGThumb: "var(--switch-bg-color-thumb)",
        tabBorderBottom: "var(--tab-border-bottom-color)",
        borderSquare: "var(--border-square)",
        foreground: "hsl(var(--foreground))",
        exportButtonBGColor: "var(--export-button-bg-color)",
        exportButtonShadowFrom: "var(--export-button-shadow-gradient-from)",
        exportButtonShadowTo: "var(--export-button-shadow-gradient-to)",
        "midnight-slate": "var(--price-bg-color)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "hsl(var(--primary-foreground))",
          gray: "var(--primary-gray)",
          white: "var(--primary-white)",
          code: "var(--code-color)",
          coralBlush: "var(--coral-blush-color)",
          grayBG: "var(--gray-bg-color)",
          grayCard: "var(--gray-card-color)",
          darkGreen: "hsl(var(--dark-green))",
          lightGreen: "var(--light-green)",
          primaryDark: "var(--primary-dark)",
          secondDark: "var(--second-dark)",
          dark: "var(--dark)",
          mainDark: "hsl(var(--main-dark))",
          green: "hsl(var(--green))",
          lightBlue: "hsl(var(--light-blue))",
          lightYellow: "hsl(var(--light-yellow))",
          lightRed: "hsl(var(--light-red))",
          lightGray: "var(--light-gray)",
          darkGray: "var(--dark-gray)",
          darkText: "var(--dark-text)",
          strongGreen: "var(--strong-green)"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        'move-up': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'move-up': 'move-up 0.8s ease-in-out 3',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
