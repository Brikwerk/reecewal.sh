module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['OA-Regular', 'Helvetica', 'Arial', 'sans-serif'],
                'body': ['OA-Light', 'Helvetica', 'Arial', 'sans-serif'],
                'light': ['OA-Light', 'Helvetica', 'Arial', 'sans-serif'],
                'mono': ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}