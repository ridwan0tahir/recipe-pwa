import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from '@tanstack/react-query'

import { RecipeDB } from '@/lib/db'
import { fetchRecipes, fetchRecipeById } from '@/lib/api'
import { PaginatedApiResponse, Recipe, RecipeFilters } from '@/types'
import { ITEMS_PER_PAGE } from '@/lib/utils'

const db = new RecipeDB()

export function useInfiniteRecipes(filters: RecipeFilters) {
	return useInfiniteQuery({
		queryKey: ['infinite-recipes', filters],
		queryFn: async ({ pageParam = 0 }) => {
			try {
				// Try to get from API
				const data = await fetchRecipes({
					...filters,
					offset: pageParam,
				})

				// Cache the results
				await db.cacheInfiniteResults(data, filters, pageParam)

				return data
			} catch (error) {
				console.log('Fetching from cache...')
				// Try to get from cache
				const cachedData = await db.getCachedInfiniteResults(filters, pageParam)

				if (cachedData) {
					return cachedData
				}
				throw error
			}
		},
		getNextPageParam: (lastPage: PaginatedApiResponse<Recipe[]>) =>
			lastPage?.totalResults > lastPage?.offset + ITEMS_PER_PAGE
				? lastPage?.offset + ITEMS_PER_PAGE
				: undefined,
		initialPageParam: 0,
	})
}

export function useRecipeDetails(id: number) {
	return useQuery({
		queryKey: ['recipe', id],
		queryFn: async () => {
			try {
				const recipe = await fetchRecipeById(id, { includeNutrition: true })
				// Check if recipe is saved
				const savedRecipes = await db.getSavedRecipes()
				const isSaved = savedRecipes.some((r) => r.id === id)
				const recipeSaved = { ...recipe, isSaved }

				await db.cacheRecipe(recipe)
				return recipeSaved
			} catch (error) {
				console.error('Failed to fetch recipe details:', error)
				// Try to get from IndexedDB
				const cachedRecipe = await db.getCachedRecipe(id)
				if (!cachedRecipe) throw error
				return cachedRecipe
			}
		},
	})
}

export function useGetSavedRecipes() {
	return useQuery({
		queryKey: ['saved-recipes'],
		queryFn: async () => {
			const savedRecipes = await db.getSavedRecipes()
			if (!savedRecipes) return []
			return savedRecipes
		},
	})
}

export function useSaveRecipe() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (recipe: Recipe) => {
			await db.saveRecipe(recipe)
			return recipe
		},
		onSuccess: (recipe) => {
			queryClient.invalidateQueries({ queryKey: ['recipe', recipe.id] })
			queryClient.invalidateQueries({ queryKey: ['saved-recipes'] })
		},
	})
}

export function useDeleteRecipe() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: number) => {
			await db.deleteRecipe(id)
			return id
		},
		onSuccess: (id) => {
			queryClient.invalidateQueries({ queryKey: ['recipe', id] })
			queryClient.invalidateQueries({ queryKey: ['saved-recipes'] })
		},
	})
}
