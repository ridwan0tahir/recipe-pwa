import { Cormorant_Upright, Open_Sans } from 'next/font/google'

export const fontCormorant = Cormorant_Upright({
	variable: '--font-cormorant',
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
})

export const fontOpenSans = Open_Sans({
	variable: '--font-open-sans',
	weight: ['300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
})
