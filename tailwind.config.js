/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // 🌑 Dark Mode Adjustments
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "#000000", // Full black
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          dark: "#0a0a0a", // Darker card background
          foreground: "hsl(var(--card-foreground))",
        },
        header: {
          dark: "#0a0a0a", // Dark header background
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          dark: "#0a0a0a",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dark: "#6F41D2", // Purple glow in dark mode
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          dark: "#1A1A1A", // Slightly lighter than black
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          dark: "#222222", // Borders
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          dark: "#2C2C2C", // Dark muted accent
          foreground: "hsl(var(--accent-foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          dark: "#222222", // Elegant border for dark mode
        },
        chart: {
          darkBg: "#141414", // Lighter chart background
          textDark: "#e0e0e0", // Light text for dark mode charts
          textLight: "#333", // Darker text for light mode
        },
      },
      boxShadow: {
        "3d-dark": "0px 4px 20px rgba(111, 65, 210, 0.4)", // Stronger purple glow
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
