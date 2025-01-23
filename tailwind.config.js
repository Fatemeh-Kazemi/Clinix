/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D91cc",
        tint: {
          5: "#77BDE0",
          4: "#A5D3EB",
          3: "#BBDEF0",
          2: "#D2E9F5",
          1: "#E8FAFA",
        },
        shade: {
          5: "#061D29",
          4: "#092B3D",
          3: "#0C3A52",
          2: "#11577A",
          1: "#1774A3",
        },
        gray: {
          5: "#ADADAD",
          4: "#CBCBCB",
          3: "#DFDFDF",
          2: "#EDEDED",
          1: "#F9F9F9",
        },
        black: {
          5: "#0C0C0C",
          4: "#202020",
          3: "#404040",
          2: "#606060",
          1: "#868686",
        },
        
      },
    },
  },
  plugins: [],
};
