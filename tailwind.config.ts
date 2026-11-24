import type { Config } from "tailwindcss";

// Design tokens for EDC CITK.
// Colors are CSS variables (defined in src/app/globals.css) holding "R G B"
// channels, so the theme can change without touching any component, and
// Tailwind opacity modifiers (bg-ink/5, text-paper/60) keep working.
// Token meaning: ink = text, paper = page background, paper-dim = raised
// panels (footer, ecosystem strip), line = hairline borders.
// Do not add ad-hoc hex values in components. Extend this file instead.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: v("ink"),
          800: v("ink-800"),
          600: v("ink-600"),
          400: v("ink-400"),
          200: v("ink-200"),
        },
        paper: {
          DEFAULT: v("paper"),
          dim: v("paper-dim"),
        },
        signal: {
          DEFAULT: v("signal"),
          50: v("signal-50"),
          100: v("signal-100"),
          600: v("signal-600"),
          700: v("signal-700"),
        },
        spark: {
          DEFAULT: v("spark"),
          100: v("spark-100"),
          600: v("spark-600"),
        },
        line: v("line"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-lg": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["1.75rem", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        micro: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
