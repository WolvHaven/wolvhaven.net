/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
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
