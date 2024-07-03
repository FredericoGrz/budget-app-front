/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      boxShadow: {
        right: "5px 0px 10px rgba(0, 0, 0, 0.1)",
        left: "-5px 0px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
