const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Nunito Sans", "ClaityCity", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				main:{
					50: '#7f0000',
					100: '#690000'
				}
			}
		},
	},
	plugins: [],
}
