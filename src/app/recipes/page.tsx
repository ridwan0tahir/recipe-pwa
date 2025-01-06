'use client'

import { Filter, Loader2 } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { Section } from '@/components/ui/section'
import { RecipeCard } from '@/components/recipes'
import QueryWrapper from '@/components/query-wrapper'
import { useInfiniteRecipes } from '@/hooks/use-recipes'
import RecipeFilters, { useRecipeFilters } from './filters'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from '@/components/ui/sheet'

export default function RecipeIndex() {
	const { filters, ...rest } = useRecipeFilters()

	const infiniteRecipeQuery = useInfiniteRecipes(filters)
	const {
		data: recipe_response,
		fetchNextPage,
		isFetchingNextPage,
	} = infiniteRecipeQuery || {}
	const recipe_data =
		recipe_response?.pages?.flatMap((page) => page?.results || []) || []

	return (
		<Section className='grid h-full grid-cols-1 lg:grid-cols-[15rem,1fr] lg:gap-10'>
			<div className='hidden lg:sticky lg:top-36 lg:block lg:h-[calc(100vh-12rem)] lg:bg-white lg:dark:bg-black'>
				<RecipeFilters {...rest} />
			</div>
			<div className='flex min-h-[calc(100vh-12rem)] flex-col gap-y-5'>
				<div className='flex items-center justify-between gap-5 bg-white p-5 dark:bg-black'>
					<Sheet>
						<SheetTrigger asChild>
							<Button className='lg:hidden'>
								<Filter className='size-6' />
								<span className='sr-only'>Filter</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='pt-10'>
							<VisuallyHidden>
								<SheetTitle>Filter</SheetTitle>
							</VisuallyHidden>
							<RecipeFilters {...rest} />
						</SheetContent>
					</Sheet>
					<p>{`Showing 1 - ${recipe_data?.length} of ${recipe_response?.pages?.[0]?.totalResults || 0} results`}</p>
				</div>
				<QueryWrapper currentQuery={infiniteRecipeQuery}>
					{recipe_data?.length > 0 ? (
						<div className='flex flex-col space-y-10'>
							<ul className='grid flex-1 grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6'>
								{recipe_data?.map((recipe) => (
									<li key={recipe?.id}>
										<RecipeCard recipe={recipe} />
									</li>
								))}
							</ul>
							<div className='flex justify-center'>
								<Button
									size='lg'
									variant='outline'
									onClick={() => fetchNextPage()}
									className='min-w-32'
									disabled={isFetchingNextPage}
								>
									{isFetchingNextPage ? (
										<Loader2 className='animate-spin' />
									) : (
										'Load more'
									)}
								</Button>
							</div>
						</div>
					) : (
						<div className='flex min-h-40 items-end justify-center'>
							<p className='text-center'>No recipes found</p>
						</div>
					)}
				</QueryWrapper>
			</div>
		</Section>
	)
}
