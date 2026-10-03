import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        income: "#10B981",
        expense: "#F43F5E",
        audit: "#F59E0B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
