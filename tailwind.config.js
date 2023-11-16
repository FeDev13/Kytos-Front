/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      PTSans: ["PT Sans", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#008080",
        secondary: "#fcfbff",
        tertiary: "#003030",
        logostart: "#293B91",
        logo: "#344698",
        logoend: "#4F60A6",
      },
    },
  },
  plugins: [],
};
