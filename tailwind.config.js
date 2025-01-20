/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        loginButton: '#7798F6', 
        loginBackgroud:"rgba(65, 59, 244, 0.107)",
      },
      screens: {
        sm: '640px',  // Kichik ekranlar
        md: '768px',  // O'rta ekranlar
        lg: '1024px', // Katta ekranlar
        xl: '1280px', // Juda katta ekranlar
        '2xl': '1536px', // Juda keng ekranlar
        '3xl': '1920px', // Qo'shimcha katta ekranlar (maxsus)
        'mobile': {'max': '639px'}, // Faqat mobil qurilmalar uchun
        'tablet': {'min': '640px', 'max': '1023px'}, // Planshet ekranlari uchun
        'laptop': {'min': '1024px', 'max': '1279px'}, // Laptop ekranlari uchun
        'desktop': {'min': '1280px'}, // Faqat desktop ekranlari uchun
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
} 
