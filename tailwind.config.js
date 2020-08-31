const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
    },
    purge: ['./src//**/*.njk', './src/**/*.svg', './src/**/*.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
                mono: ['Cascadia Code', ...defaultTheme.fontFamily.mono],
            },
        },
        typography: (t) => ({
            default: {
                css: {
                    color: defaultTheme.colors.gray[900],
                    a: {
                        color: defaultTheme.colors.blue[700],
                        borderBottomWidth: '1px',
                        borderBottomColor: defaultTheme.colors.blue[700],
                        fontWeight: defaultTheme.fontWeight.light,
                        textDecoration: 'none',
                        '&:hover': {
                            color: defaultTheme.colors.blue[600],
                            borderBottomColor: defaultTheme.colors.blue[600],
                        },
                    },
                    pre: {
                        lineHeight: defaultTheme.lineHeight.snug,
                    },
                    'pre code': {
                        fontWeight: defaultTheme.fontWeight.light,
                        lineHeight: '1.5em',
                    },
                    code: {
                        fontWeight: defaultTheme.fontWeight.light,
                        color: defaultTheme.colors.gray[900],
                        background: defaultTheme.colors.gray[200],
                        borderColor: defaultTheme.colors.gray[400],
                        borderWidth: 1,
                        padding: defaultTheme.spacing[1],
                    },
                    'code::before': {
                        content: '&nbsp;',
                    },
                    'code::after': {
                        content: '&nbsp;',
                    },
                },
            },
        }),
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
