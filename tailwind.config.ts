import type { Config } from 'tailwindcss'

import TailwindAnimate from 'tailwindcss-animate'

export default {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
    	container: {
    		center: true,
    		padding: '1rem',
    		screens: {
    			'2xl': '1332px'
    		}
    	},
    	extend: {
    		colors: {
    			background: 'rgb(var(--background))',
    			foreground: 'rgb(var(--foreground))',
    			primary: 'rgb(var(--primary))'
    		},
    		fontFamily: {
    			cormorant: [
    				'var(--font-cormorant)'
    			],
    			'open-sans': [
    				'var(--font-open-sans)'
    			]
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [TailwindAnimate],
} satisfies Config
