/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic luxury palette */
        ocean: {
          50: "#E8EDF5",
          100: "#C5D0E3",
          200: "#8FA3C4",
          300: "#5A75A5",
          400: "#2E4A7A",
          500: "#1A3058",
          600: "#122440",
          700: "#0A1128",
          800: "#070C1C",
          900: "#040810",
          950: "#020408",
          DEFAULT: "#0A1128",
        },
        champagne: {
          50: "#FBF8F1",
          100: "#F5EFE0",
          200: "#EBDFC2",
          300: "#DFCB9E",
          400: "#D4B87A",
          500: "#C9A86C",
          600: "#B08F4F",
          700: "#8C7140",
          800: "#6B5632",
          900: "#4A3C22",
          950: "#2E2514",
          DEFAULT: "#C9A86C",
        },
        pearl: {
          DEFAULT: "#FFFFFF",
          muted: "#FAFAF8",
        },
        alabaster: {
          DEFAULT: "#F8F6F3",
          dark: "#EFEBE5",
        },
        charcoal: {
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#C4C4C4",
          300: "#9A9A9A",
          400: "#6B6B6B",
          500: "#4A4A4A",
          600: "#3A3A3A",
          700: "#2C2C2C",
          800: "#1F1F1F",
          900: "#141414",
          DEFAULT: "#2C2C2C",
        },
        /* Shadcn-compatible semantic aliases (wired in globals.css) */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "var(--font-jakarta)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-md": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
        "overline": [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.12em", fontWeight: "500" },
        ],
      },
      letterSpacing: {
        editorial: "-0.02em",
        luxury: "0.08em",
        widest: "0.2em",
      },
      spacing: {
        "section-sm": "6rem",
        "section-md": "8rem",
        "section-lg": "10rem",
        "section-xl": "12rem",
      },
      maxWidth: {
        "content-sm": "40rem",
        "content-md": "56rem",
        "content-lg": "72rem",
        "content-xl": "90rem",
        editorial: "65ch",
      },
      borderRadius: {
        luxury: "0.125rem",
        "luxury-md": "0.25rem",
        "luxury-lg": "0.5rem",
      },
      boxShadow: {
        luxury: "0 4px 24px -4px rgba(10, 17, 40, 0.08)",
        "luxury-md": "0 8px 40px -8px rgba(10, 17, 40, 0.12)",
        "luxury-lg": "0 16px 64px -12px rgba(10, 17, 40, 0.16)",
        "luxury-gold": "0 4px 24px -4px rgba(201, 168, 108, 0.2)",
      },
      transitionDuration: {
        luxury: "500ms",
        "luxury-slow": "700ms",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.4, 0, 0.2, 1)",
        "luxury-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "luxury-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(1.5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-luxury":
          "linear-gradient(135deg, var(--tw-gradient-from, #0A1128) 0%, var(--tw-gradient-to, #122440) 100%)",
        "gradient-champagne":
          "linear-gradient(135deg, #C9A86C 0%, #DFCB9E 100%)",
      },
    },
  },
  plugins: [],
};
