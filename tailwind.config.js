import Products from './src/views/Products.vue'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // theme-color
                primary: '#D8A034',
                secondary: '#BF8616',
                tertiary: '#FEDD9D',
                // views-color
                products: '#D9D9D9',
                // enabled color
                enabled: '#06AB20',
                notEnabled: '#bb1010',
            },
            borderRadius: {
                5: '5px',
                10: '10px',
                20: '20px',
                40: '40px',
            },
        },
    },
    plugins: [],
}
