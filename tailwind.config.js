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
            },
        },
        typography: (t) => ({
            default: {
                css: {
                    color: defaultTheme.colors.gray[900],
                    a: {
                        color: defaultTheme.colors.blue[700],
                        fontWeight: defaultTheme.fontWeight.normal,
                        borderBottomWidth: '1px',
                        borderBottomColor: defaultTheme.colors.blue[700],
                        textDecoration: 'none',
                        '&:hover': {
                            color: defaultTheme.colors.blue[600],
                        },
                    },
                    pre: {
                        marginLeft: '-' + defaultTheme.spacing[4],
                        marginRight: '-' + defaultTheme.spacing[4],
                        paddingLeft: defaultTheme.spacing[4],
                        paddingRight: defaultTheme.spacing[4],
                        lineHeight: defaultTheme.lineHeight.snug,
                    },
                    'pre code': {
                        fontWeight: 300,
                        fontFamily: "'Cascadia Code', Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;",
                        lineHeight: '1.5em',
                    },
                    code: {
                        fontFamily: "'Cascadia Code', Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;",
                        fontWeight: 300,
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
