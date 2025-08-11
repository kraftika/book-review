/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/reviews/*.md"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
