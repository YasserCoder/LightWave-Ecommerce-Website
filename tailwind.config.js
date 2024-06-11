/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "15px",
        },
        extend: {
            fontFamily: {
                main: ["Lato"],
            },
            colors: {
                primary: "#474a51",
                bluegreen: "#15616d",
                secondary: "#fafafa",
                grey: "#b1b1b1",
                hovercol: "#cedfe1",
            },
            gridTemplateColumns: {
                220: "repeat(auto-fill, minmax(220px, 1fr));",
                200: "repeat(auto-fill, minmax(200px, 1fr));",
            },
            screens: {
                xs: "440px",
            },
        },
    },
    plugins: [],
};
