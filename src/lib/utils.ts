import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const ITEMS_PER_PAGE = 20

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const proofObject = (obj: Record<string, any>): Record<string, any> => {
	return Object.keys(obj)?.reduce((acc: Record<string, any>, key: string) => {
		const value = obj[key]
		if (
			value !== null &&
			value !== '' &&
			value !== undefined &&
			value !== '-' &&
			!(Array.isArray(value) && value?.length === 0)
		) {
			acc[key] = value
		}
		return acc
	}, {})
}

export const navLinkMap = [
	{ name: 'Home', href: '/' },
	{ name: 'Discover', href: '/recipes' },
	{ name: 'Saved Recipes', href: '/saved' },
]
