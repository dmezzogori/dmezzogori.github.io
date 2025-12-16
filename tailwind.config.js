/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{njk,md,html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["JetBrains Mono", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
