import { Menu } from 'lucide-react'
import { useState } from 'react'

import { navLinkMap } from '@/lib/utils'
import { LinkButton } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

export default function MobileNavbar() {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className='lg:hidden'>
				<Menu className='size-6 stroke-1 lg:hidden' />
			</SheetTrigger>
			<SheetContent className='background border-primary pt-32'>
				<div className='flex flex-col divide-y divide-primary'>
					{navLinkMap.map(({ name, href }, idx) => (
						<LinkButton
							key={idx}
							href={href}
							variant='link'
							className='px-6 py-4 font-medium text-foreground'
							onClick={() => setOpen(false)}
						>
							{name}
						</LinkButton>
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}
