import { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'

import { cn } from '@/lib/utils'
import { fontCormorant } from '@/lib/fonts'
import { Header, Footer } from '@/components/layouts'
import { ThemeProvider } from '@/components/theme-provider'
import ReactQueryProvider from '@/components/query-provider'

const APP_NAME = 'RecipeX'
const APP_DEFAULT_TITLE = 'RecipeX'
const APP_TITLE_TEMPLATE = 'RecipeX | %s'
const APP_DESCRIPTION = `Discover a world of delicious recipes and culinary inspirations. From quick meals to gourmet dishes, find step-by-step guides, and flavour-packed ideas to elevate your kitchen.`

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: '/manifest.json',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: 'website',
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: 'summary',
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
}

interface RootLayoutProps {
	children: ReactNode
}
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'bg-background font-cormorant text-sm font-normal text-foreground antialiased lg:text-base',
					fontCormorant.variable
				)}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<ReactQueryProvider>
						<div className='grid min-h-dvh grid-rows-[auto,1fr,auto]'>
							<Header />
							<main className='h-full'>{children}</main>
							<Footer />
						</div>
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
