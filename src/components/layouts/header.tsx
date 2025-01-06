'use client'

import Link from 'next/link'

import { LogoIcon } from '@/components/icons'
import { LinkButton } from '@/components/ui/button'
import { ModeToggle } from './theme-toggle'
import MobileNavbar from './mobile-navbar'
import { navLinkMap } from '@/lib/utils'

export default function Header() {
	return (
		<header className='sticky top-0 z-50 flex min-h-20 items-center bg-background bg-white dark:bg-black md:min-h-24'>
			<div className='flex flex-1 items-center justify-between gap-x-10 px-4 text-foreground md:container'>
				<Link href='/'>
					<LogoIcon className='h-10 w-36 lg:h-12 lg:w-44' />
				</Link>
				<div className='flex items-center gap-x-4'>
					<ul className='hidden lg:flex lg:items-center'>
						{navLinkMap.map(({ name, href }) => (
							<li key={href} className='p-1'>
								<LinkButton href={href} variant='link' className='p-1 px-3'>
									{name}
								</LinkButton>
							</li>
						))}
					</ul>
					<ModeToggle />
					<MobileNavbar />
				</div>
			</div>
		</header>
	)
}
