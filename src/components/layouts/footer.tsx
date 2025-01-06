import {
	FacebookIcon,
	InstagramIcon,
	LogoIcon,
	SpoonIcon,
	TwwitterIcon,
} from '@/components/icons'
import { LinkButton } from '@/components/ui/button'
import { Section, SectionSubHeader } from '@/components/ui/section'
import { navLinkMap } from '@/lib/utils'

const SOCIAL_MEDIA_MAP = [
	{ icon: FacebookIcon, href: '#' },
	{ icon: InstagramIcon, href: '#' },
	{ icon: TwwitterIcon, href: '#' },
]

export default function Footer() {
	return (
		<footer className='flex min-h-80 items-center justify-center bg-white dark:bg-black'>
			<Section className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
				<div className='flex flex-col items-center justify-center space-y-2 text-center'>
					<LogoIcon className='inline-block h-12 w-44' />
					<div className='flex flex-col items-center'>
						<q>
							The best way to find yourself is to lose yourself in the service
							of others
						</q>
						<SpoonIcon className='h-2.5 w-10 text-primary' />
					</div>
					<ul className='flex items-center gap-1'>
						{SOCIAL_MEDIA_MAP.map((item, index) => (
							<li key={index}>
								<LinkButton variant='link' href={item.href} className='p-1'>
									<item.icon className='size-8' />
								</LinkButton>
							</li>
						))}
					</ul>
				</div>
				<ul className='flex flex-col items-center justify-center'>
					{navLinkMap.map(({ name, href }) => (
						<li key={href} className='p-1'>
							<LinkButton href={href} variant='link' className='p-1 px-3'>
								{name}
							</LinkButton>
						</li>
					))}
				</ul>
				<div className='flex flex-col space-y-2 text-center'>
					<SectionSubHeader className='text-foreground'>
						Contact Us
					</SectionSubHeader>
					<p>9W 53rd Street. New York, NY 10019, USA</p>
					<LinkButton
						variant='link'
						href='mailto:example@example.com'
						className='text-base leading-none'
					>
						example@example.com
					</LinkButton>
					<LinkButton
						variant='link'
						href='tel:+1212112122'
						className='text-base leading-none'
					>
						+1 212-112-122
					</LinkButton>
				</div>
			</Section>
		</footer>
	)
}
