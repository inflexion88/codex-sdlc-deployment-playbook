import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        deck: "0 24px 60px rgba(15, 23, 42, 0.16)"
      }
    }
  },
  plugins: []
} satisfies Config;
