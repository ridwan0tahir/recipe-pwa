import Axios from 'axios'
import { PaginatedApiResponse, Recipe } from '@/types'

export const spoonocularApi = Axios.create({
	baseURL: 'https://api.spoonacular.com/recipes',
	timeout: 8000,
	params: {
		apiKey: '4fddca4b0d554054ab26f993d7281e7e',
	},
})
spoonocularApi.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(error)
)

export async function fetchRecipes(
	params: Record<string, any> = {}
): Promise<PaginatedApiResponse<Recipe[]>> {
	return spoonocularApi.get('/complexSearch', {
		params: { ...params, addRecipeInformation: true },
	})
}

export async function fetchRecipeById(
	id: number,
	params: Record<string, any> = {}
): Promise<Recipe> {
	return spoonocularApi.get(`${id}/information`, {
		params,
	})
}
