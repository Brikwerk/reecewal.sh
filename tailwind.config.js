module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['OA-Regular', 'Helvetica', 'Arial', 'sans-serif'],
                'body': ['OA-Book', 'Helvetica', 'Arial', 'sans-serif'],
                'light': ['OA-Light', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}