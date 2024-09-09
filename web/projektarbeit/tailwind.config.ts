import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'sf-display': ['SF Pro Display', 'serif'],
			},
			fontWeight: {
				'thin': '100',
				'ultralight': '200',
				'light': '300',
				'regular': '400',
				'medium': '500',
				'semibold': '600',
				'bold': '700',
				'heavy': '800',
				'black': '900',
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
