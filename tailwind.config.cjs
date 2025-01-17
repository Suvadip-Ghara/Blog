/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						color: 'inherit',
						a: {
							color: '#3182ce',
							'&:hover': {
								color: '#2c5282',
							},
						},
					},
				},
			},
			animation: {
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};