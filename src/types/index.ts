export interface Recipe {
	id: number
	title: string
	image: string
	imageType: string
	servings: number
	readyInMinutes: number
	instructions?: string
	summary?: string
	extendedIngredients?: Ingredient[]
	isSaved?: boolean
	needsSync?: boolean
	analyzedInstructions?: Instruction[]
	nutrition?: { nutrients: Nutrient[]; caloricBreakdown: CaloricBreakdown }
}

export interface CaloricBreakdown {
	percentProtein: number
	percentFat: number
	percentCarbs: number
}

export interface Ingredient {
	id: number
	name: string
	amount: number
	unit: string
	original: string
}

export interface Nutrient {
	name: string
	amount: number
	unit: string
}

export interface Instruction {
	name: string
	steps: InstructionSteps[]
}

export interface InstructionSteps {
	ingredients: Ingredient
	number: number
	step: string
}

export interface RecipeFilters {
	type?: string
	cuisine?: string
	diet?: string
	query?: string
	offset?: number
	number?: number
}

export type ApiResponse<T = null | undefined> = {
	results: T[]
	offset: number
	number: number
	totalResults?: number
}

export type PaginatedApiResponse<T = any[]> = {
	results: T
	offset: number
	number: number
	totalResults: number
}
