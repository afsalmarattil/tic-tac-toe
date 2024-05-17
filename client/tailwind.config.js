module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: "class",
  safelist: [
    ...Array(15).fill().map((_, i) => `grid-cols-${i + 1}`),
  ],
}
