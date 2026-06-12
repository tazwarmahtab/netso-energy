/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary: DM Sans (body + UI — replaces Inter)
        sans: ['DM Sans', 'sans-serif'],
        // Display: Syncopate (hero headlines — bold, spaced, Awwwards)
        display: ['Syncopate', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Solar Brand Colors
        'solar': {
          DEFAULT: '#F59E0B',
          gold: '#F59E0B',
          amber: '#D97706',
          ember: '#92400E',
        },
        // Dark Surface Palette
        'night': '#0A0D14',
        'charcoal': '#111827',
        'slate': '#1E293B',
        'steel': '#475569',
        'mist': '#94A3B8',
        'cloud': '#CBD5E1',
        'fog': '#F1F5F9',
        // Shadcn / Nova theme mappings
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        // Legacy
        dark: '#0A0D14',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}