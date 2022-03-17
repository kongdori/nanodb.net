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
                primary: withOpacityValue('--color-primary'),
                dark: withOpacityValue('--color-dark'),
                background: withOpacityValue('--color-background'),
                'background-dark': withOpacityValue('--color-background-dark')
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
};
