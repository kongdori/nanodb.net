module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        fontFamily: {
            sans: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Helvetica',
                'Roboto',
                'Noto Sans KR',
                'Arial',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji'
            ]
        },
        extend: {
            colors: {
                nanodb: '#2f2e2b'
            }
        }
    },
    plugins: []
};
