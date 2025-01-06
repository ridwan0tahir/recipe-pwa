/** @type {import('next').NextConfig} */
import NextPWA from '@ducanh2912/next-pwa'

const withPWA = NextPWA({
	disable: false,
	dest: 'public',
	register: true,
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swcMinify: true,
	extendDefaultRuntimeCaching: true,
	workboxOptions: {
		disableDevLogs: true,
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/api\.spoonacular\.com\/.*$/,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'spoonacular-api-cache',
					expiration: {
						maxEntries: 100,
						maxAgeSeconds: 24 * 60 * 60, // 24 hours
					},
				},
			},
			{
				urlPattern: /^https:\/\/spoonacular\.com\/cdn\/.*$/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'spoonacular-images-cache',
					expiration: {
						maxEntries: 50,
						maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
					},
				},
			},
		],
	},
})

export default withPWA({
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.spoonacular.com',
				pathname: '/**',
			},
		],
	},
})
