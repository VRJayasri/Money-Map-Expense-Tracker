/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
   
         brandBrown: 'rgb(78, 52, 46)',
          brandBeige: 'rgb(215, 204, 200)',

  },
    },
  },
  plugins: [],
};
