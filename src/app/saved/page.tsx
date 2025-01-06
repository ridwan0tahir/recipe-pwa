'use client'

import QueryWrapper from '@/components/query-wrapper'
import { RecipeCard } from '@/components/recipes'
import { Section, SectionSubHeader } from '@/components/ui/section'
import { useGetSavedRecipes } from '@/hooks/use-recipes'

export default function FavouriteIndex() {
	const savedRecipeQuery = useGetSavedRecipes()
	const { data: recipe_response } = savedRecipeQuery || {}
	const recipe_data = recipe_response || []

	return (
		<Section className='space-y-8'>
			<SectionSubHeader>
				Saved Recipes&nbsp;
				<small className='text-4xl'>{`(${recipe_data?.length})`}</small>
			</SectionSubHeader>
			<QueryWrapper currentQuery={savedRecipeQuery}>
				<ul className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6'>
					{recipe_data?.map((recipe) => (
						<li key={recipe?.id}>
							<RecipeCard recipe={recipe} />
						</li>
					))}
				</ul>
			</QueryWrapper>
		</Section>
	)
}
