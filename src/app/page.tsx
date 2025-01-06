import { FC } from 'react'
import { StaticImageData } from 'next/image'

import {
	BannerImage1,
	BannerImage2,
	BannerImage4,
	BannerImage5,
} from '@/assets/images'
import { LinkButton } from '@/components/ui/button'
import {
	Section,
	SectionHeader,
	SectionSubHeader,
} from '@/components/ui/section'
import {
	Laure1Icon,
	Laure2Icon,
	Laure3Icon,
	Laure4Icon,
} from '@/components/icons'
import { Image } from '@/components/ui/image'
import { cn } from '@/lib/utils'

const LAUREL_CONTENT = [
	{
		Icon: Laure1Icon,
		title: 'Bib Gourmound',
		content: 'Lorem ipsum dolor sit amet, consectetur.',
	},
	{
		Icon: Laure2Icon,
		title: 'Rising Star',
		content: 'Lorem ipsum dolor sit amet, consectetur.',
	},
	{
		Icon: Laure3Icon,
		title: 'AA Hospitality ',
		content: 'Lorem ipsum dolor sit amet, consectetur.',
	},
	{
		Icon: Laure4Icon,
		title: 'Outstanding Chef',
		content: 'Lorem ipsum dolor sit amet, consectetur.',
	},
]

interface SectionDisplayProps {
	src: StaticImageData | string
	alt?: string
	className?: string
	showBoxes?: boolean
}
const SectionDisplay: FC<SectionDisplayProps> = ({
	className,
	src,
	alt = '',
	showBoxes = true,
}) => {
	return (
		<div className={cn('relative p-6', className)}>
			<Image
				src={src}
				alt={alt}
				className='aspect-[1/1.12] min-w-0 shrink-0 grow-0 basis-full'
			/>
			{showBoxes && (
				<>
					{Array.from({ length: 2 }).map((_, index) => (
						<div
							key={index}
							className={cn('absolute z-10 size-3/5 bg-primary', {
								'right-0 top-0': index === 0,
								'bottom-0 left-0': index === 1,
							})}
						></div>
					))}
				</>
			)}
		</div>
	)
}

export default async function Home() {
	return (
		<>
			<Section className='grid grid-cols-1 gap-16 md:grid-cols-2'>
				<div className='self-center'>
					<SectionHeader>Chase the new Flavour</SectionHeader>
					<SectionSubHeader>The Key To Fine Dining</SectionSubHeader>
					<p className='mb-8 mt-6'>
						We deliver recipes that inspire creativity and elevate everyday
						meals extraordinary experiences. Chase bold flavours and discover
						the key to unforgettable moments in the kitchen.
					</p>
					<LinkButton href='/recipes' variant='primary' size='lg'>
						Explore Recipe
					</LinkButton>
				</div>
				<SectionDisplay src={BannerImage1} alt='Banner Image 1' />
			</Section>
			<Section className='grid grid-cols-1 gap-16 bg-white dark:bg-black md:grid-cols-2'>
				<div className='self-center lg:order-2'>
					<SectionHeader>About RecipeX</SectionHeader>
					<SectionSubHeader>Crafting Culinary Journey</SectionSubHeader>
					<p className='mb-8 mt-6'>
						A celebration of taste, culture, and creativity. RecipeX invites you
						to explore a world of flavours. Each recipe is gateway to fine
						dining, designed to inspire and elevate your everyday meals.
					</p>
				</div>
				<SectionDisplay
					src={BannerImage2}
					alt='Banner Image 2'
					className='lg:order-1'
				/>
			</Section>
			<Section className='grid grid-cols-1 gap-16 md:grid-cols-2'>
				<div className='self-center'>
					<SectionHeader>Awards and Recognitions</SectionHeader>
					<SectionSubHeader>Our Laurels</SectionSubHeader>
					<ul className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
						{LAUREL_CONTENT.map(({ Icon, title, content }, index) => (
							<li key={index} className='flex items-center gap-2'>
								<Icon />
								<div className='flex flex-col'>
									<h3 className='text-xl font-medium text-primary'>{title}</h3>
									<p>{content}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
				<SectionDisplay src={BannerImage4} alt='Banner Image 4' />
			</Section>
			<Section className='grid grid-cols-1 gap-16 bg-white dark:bg-black md:grid-cols-2'>
				<div className='self-center lg:order-2'>
					<SectionHeader>Meet the Chef</SectionHeader>
					<SectionSubHeader>The Architect of Flavours</SectionSubHeader>
					<p className='mb-8 mt-6'>
						<q>
							Sit tellus lobortis sed senectus vivamus molestie. Condimentum
							volutpat morbi facilisis quam scelerisque sapien. Et, penatibus
							aliquam amet tellus
						</q>
					</p>
					<h4 className='text-3xl font-medium text-primary'>Kevin Luo</h4>
					<h5 className='text-base text-foreground'>Chef & Founder</h5>
				</div>
				<SectionDisplay
					src={BannerImage5}
					alt='Banner Image 5'
					className='lg:order-1'
				/>
			</Section>
		</>
	)
}
