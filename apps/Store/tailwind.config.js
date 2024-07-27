/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",    
    "../../packages/ui/**/*{.js,.ts,.jsx,.tsx}",

 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flexBasis: {
        '1/8': '12.5%',
        '1/10': '10%'
      }
    },
  },
  plugins: [],
}