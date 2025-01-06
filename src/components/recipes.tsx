import { FC } from 'react'
import { ArrowRight, Clock } from 'lucide-react'

import { Recipe } from '@/types'
import { Image } from './ui/image'
import { LinkButton } from './ui/button'

interface RecipeCardProps {
	recipe: Recipe
}
export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
	return (
		<div className='flex size-full flex-col overflow-hidden bg-white dark:bg-black'>
			<Image
				src={recipe?.image}
				alt={recipe?.title}
				className='aspect-[1.2/1] w-full transition-transform duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 after:from-20% after:to-black/20 after:to-80% hover:scale-x-105'
			/>
			<div className='flex size-full flex-col justify-between gap-y-3 p-3'>
				<h4 className='line-clamp-2 text-ellipsis font-cormorant text-xl font-medium leading-tight text-foreground'>
					{recipe?.title}
				</h4>
				<div className='flex items-center justify-between gap-2'>
					<div className='flex items-center text-sm leading-none'>
						<Clock className='mr-1 inline-block size-3' />
						{`${recipe?.readyInMinutes}min`}
					</div>
					<LinkButton
						variant='link'
						href={`/recipes/${recipe?.id}`}
						className='w-max'
					>
						View
						<ArrowRight />
					</LinkButton>
				</div>
			</div>
		</div>
	)
}
