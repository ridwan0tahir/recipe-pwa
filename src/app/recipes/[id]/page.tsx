'use client'

import React, { ButtonHTMLAttributes, useState } from 'react'
import {
	Timer,
	Users,
	Flame,
	ShoppingCart,
	Heart,
	Bookmark,
} from 'lucide-react'

import { Section, SectionSubHeader } from '@/components/ui/section'
import { Image } from '@/components/ui/image'
import QueryWrapper from '@/components/query-wrapper'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
	useDeleteRecipe,
	useRecipeDetails,
	useSaveRecipe,
} from '@/hooks/use-recipes'
import { Recipe } from '@/types'
import { cn } from '@/lib/utils'
import { CopyVariableToClipboard } from './copy-to-clipboard'

// prettier-ignore
const SELECTED_NUTRITIENTS = ['Calories', 'Carbs', 'Fat', 'Protein', 'Fiber', 'Net Carbs', 'Sodium', 'Cholesterol', 'Sugar', 'Saturated Fat', 'Monounsaturated Fat', 'Polyunsaturated Fat'];

const RECIPE_DETAILS_MAP = [
	{ id: 'cookingMinutes', Icon: Timer, label: 'Mins' },
	{ id: 'servings', Icon: Users, label: 'Servings' },
	{ id: 'aggregateLikes', Icon: Heart, label: 'Likes' },
	{ id: 'healthScore', Icon: Flame, label: 'Health Score' },
	{ id: 'ingredients', Icon: ShoppingCart, label: 'Ingredients' },
]

interface SaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	recipe: Recipe
}
const SaveButton = ({ recipe, ...props }: SaveButtonProps) => {
	const [isRecipeSaved, setIsRecipeSaved] = useState(recipe?.isSaved || false)
	const saveMutation = useSaveRecipe()
	const deleteMutation = useDeleteRecipe()

	const handleRecipeMutations = () => {
		if (!isRecipeSaved) {
			saveMutation.mutate(recipe)
			setIsRecipeSaved(true)
			return
		}
		deleteMutation.mutate(recipe?.id)
		setIsRecipeSaved(false)
	}

	return (
		<Button size='icon' onClick={handleRecipeMutations} {...props}>
			{saveMutation.isPending || deleteMutation.isPending ? (
				<Spinner size='sm' />
			) : (
				<Bookmark
					className={cn('!size-8 !stroke-2', {
						'fill-current': isRecipeSaved,
					})}
				/>
			)}
			<span className='sr-only'>Bookmark</span>
		</Button>
	)
}

export default function RecipeId({ params }: { params: { id: string } }) {
	const recipeQuery = useRecipeDetails(Number(params?.id))
	const { data: recipe_data } = recipeQuery || {}

	return (
		<Section>
			<QueryWrapper currentQuery={recipeQuery}>
				{recipe_data ? (
					<>
						<div className='grid grid-cols-1 gap-8 border-b border-gray-200 pb-6 dark:border-gray-800 lg:grid-cols-[1fr,20rem] lg:gap-10'>
							<div className='flex flex-col gap-4'>
								<SectionSubHeader>{recipe_data?.title}</SectionSubHeader>
								<ul className='flex flex-wrap items-center gap-4'>
									{RECIPE_DETAILS_MAP?.map(({ id, Icon, label }) => (
										<li key={id} className='flex items-center gap-1'>
											<Icon size={20} />
											<span className='text-base'>{`${recipe_data?.[id as keyof Recipe] || recipe_data?.extendedIngredients?.length} ${label}`}</span>
										</li>
									))}
								</ul>
							</div>
							<div className='flex items-end gap-4'>
								<SaveButton recipe={recipe_data} />
								<CopyVariableToClipboard
									text={
										typeof window !== undefined ? window?.location?.href : ''
									}
								/>
							</div>
						</div>
						<article className='grid grid-cols-1 gap-8 py-8 md:grid-cols-[1fr,20rem] md:gap-10'>
							<Image
								src={recipe_data?.image || ''}
								alt='Recipe'
								className='aspect-[1.2/1] size-full object-cover md:aspect-auto'
							/>
							<div className='flex flex-col gap-4 bg-white p-5 dark:bg-black'>
								<h3 className='text-xl font-medium'>Nutritional Facts</h3>
								<ul className='flex flex-col divide-y divide-gray-200 dark:divide-gray-800'>
									{recipe_data?.nutrition?.nutrients
										?.filter((nut) => SELECTED_NUTRITIENTS.includes(nut?.name))
										?.map((nut) => (
											<li
												key={nut?.name}
												className='flex items-center justify-between gap-1 py-2'
											>
												{nut?.name}&nbsp;
												<span>{`${nut?.amount}${nut?.unit}`}</span>
											</li>
										))}
								</ul>
							</div>
							<p
								className='text-sm md:col-span-full lg:col-span-1'
								dangerouslySetInnerHTML={{ __html: recipe_data?.summary || '' }}
							/>
							<div className='grid grid-cols-1 gap-4 md:col-span-full md:grid-cols-[1fr,1.5fr] md:gap-8 lg:col-span-1 lg:col-start-1 lg:col-end-2'>
								<div className='flex flex-col gap-2 bg-white p-5 dark:bg-black'>
									<h3 className='text-xl font-medium'>Ingredrients</h3>
									<ul className='flex list-inside list-disc flex-col gap-1'>
										{recipe_data?.extendedIngredients?.map((ing) => (
											<li key={ing?.id} className='pl-8 -indent-6'>
												{ing?.original}
											</li>
										))}
									</ul>
								</div>
								<div className='flex flex-col gap-2'>
									<h3 className='text-xl font-medium'>Instructions</h3>
									<ul className='flex list-inside list-decimal flex-col gap-1'>
										{recipe_data?.analyzedInstructions?.[0]?.steps?.map(
											(step) => (
												<li key={step?.number} className='pl-4 -indent-4'>
													{step?.step}
												</li>
											)
										)}
									</ul>
								</div>
							</div>
						</article>
					</>
				) : (
					<p>Cannot Get Recipe</p>
				)}
			</QueryWrapper>
		</Section>
	)
}
