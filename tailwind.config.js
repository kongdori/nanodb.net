function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))`;
        }
        return `rgb(var(${variable}) / ${opacityValue})`;
    };
}

module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './containers/**/*.{js,ts,jsx,tsx}'
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
                primary: withOpacityValue('--color-primary'),
                dark: withOpacityValue('--color-dark')
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
};
