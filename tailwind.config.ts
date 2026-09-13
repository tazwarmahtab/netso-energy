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
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['Satoshi Mono', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem',
        '6': '1.5rem', '8': '2rem', '9': '2.25rem', '10': '2.5rem',
        '15': '3.75rem', '16': '4rem', '25': '6.25rem', '31': '7.75rem', '45': '11.25rem',
      },
      colors: {
        /* Existing application tokens remain backward-compatible. */
        border: "var(--border)",
        input: "rgba(0, 0, 0, 0.04)",
        ring: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: { DEFAULT: "var(--accent)", foreground: "var(--background)", glow: "#e0d4ff" },
        secondary: { DEFAULT: "var(--surface)", foreground: "#1a1a1a" },
        destructive: { DEFAULT: "#f66f00", foreground: "#ffffff" },
        muted: { DEFAULT: "var(--surface)", foreground: "var(--text-muted)" },
        accent: { DEFAULT: "#c8b2ff", foreground: "var(--background)" },
        popover: { DEFAULT: "#ffffff", foreground: "#1a1a1a" },
        card: { DEFAULT: "#ffffff", foreground: "#1a1a1a" },
        sidebar: {
          DEFAULT: "var(--background)", foreground: "var(--foreground)", primary: "var(--accent)",
          "primary-foreground": "var(--background)", accent: "var(--surface)", "accent-foreground": "var(--foreground)",
          border: "var(--border)", ring: "var(--accent)",
        },
        /* NETSO // ENERGY SIGNAL v1.1 */
        netso: {
          black: "#050505",
          yellow: "#f5c400",
          "off-white": "#f2f1ec",
          "industrial-900": "#111111",
          "industrial-700": "#2a2a28",
          "industrial-500": "#666660",
          "industrial-300": "#a8a8a1",
          "industrial-100": "#deddd7",
        },
      },
      borderRadius: {
        lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "sun-pulse": { "0%, 100%": { opacity: "0.5", transform: "scale(1)" }, "50%": { opacity: "0.8", transform: "scale(1.05)" } },
        "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both", "fade-in": "fade-in 0.6s ease-out both",
        "sun-pulse": "sun-pulse 6s ease-in-out infinite", "marquee": "marquee 40s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
