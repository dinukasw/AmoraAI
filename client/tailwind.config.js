/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },

        fontFamily: {
            primary: [ "Roboto", "serif"],
            secondary: ["Montserrat", "serif"],
        },

        extend: {
            backgroundImage: {
                "custom-bg": "url('../assets/bg-img/bg-1.png')",
            },
            colors: {
                primary: "#000",
                secondary: "#DCC69C",
                bg: "#F8F5F0",
                white: "#FAF9F6",
                black: "#000000",
                gray: "#F5F5F5",
            },

            fontSize: {
                sm: "0.8rem",
                base: "1rem",
                xl: "1.125rem",
                "2xl": "1.563rem",
                "3xl": "1.953rem",
                "4xl": "2.441rem",
                "5xl": "3.052rem",
            },
        },
    },
    plugins: [],
};
