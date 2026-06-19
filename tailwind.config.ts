import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        // Satoshi as primary font
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Georgia', 'serif'], // Satoshi for general headings
        editorial: ['"Playfair Display"', 'Georgia', 'serif'], // High-contrast serif for hero titles only
        mono: ['Satoshi Mono', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '1': '0.25rem',  // 4px base
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '9': '2.25rem',  // 36px
        '10': '2.5rem',  // 40px
        '15': '3.75rem', // 60px
        '16': '4rem',    // 64px
        '25': '6.25rem', // 100px
        '31': '7.75rem', // 124px
        '45': '11.25rem',// 180px
      },
      colors: {
        // Light theme palette - inspired by netsoenergy.com
        border: "var(--border)",
        input: "rgba(0, 0, 0, 0.04)",
        ring: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--background)",
          glow: "#e0d4ff", // Lighter purple glow
        },
        secondary: {
          DEFAULT: "var(--surface)", // Pure white surface for secondary
          foreground: "#1a1a1a",
        },
        destructive: {
          DEFAULT: "#f66f00", // Orange
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "var(--surface)", // Surface for muted elements
          foreground: "var(--text-muted)", // Muted grey text
        },
        accent: {
          DEFAULT: "#c8b2ff", // Purple/lavender accent
          foreground: "var(--background)",
        },
        popover: {
          DEFAULT: "#ffffff", // Surface for popover
          foreground: "#1a1a1a",
        },
        card: {
          DEFAULT: "#ffffff", // Surface for cards
          foreground: "#1a1a1a",
        },
        sidebar: {
          DEFAULT: "var(--background)",
          foreground: "var(--foreground)",
          primary: "var(--accent)",
          "primary-foreground": "var(--background)",
          accent: "var(--surface)",
          "accent-foreground": "var(--foreground)",
          border: "var(--border)",
          ring: "var(--accent)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "sun-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "sun-pulse": "sun-pulse 6s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
