module.exports = {
    darkMode: 'class',
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './containers/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        fontFamily: {
            sans: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Apple SD Gothic Neo',
                'Helvetica Neue',
                'Inter',
                'Noto Sans KR',
                'Arial',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji'
            ]
        },
        extend: {
            colors: {
                dark: '#202124'
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
};
