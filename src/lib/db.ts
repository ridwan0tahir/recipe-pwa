import { RecipeFilters, Recipe, PaginatedApiResponse } from '@/types'

export class RecipeDB {
	private db: IDBDatabase | null = null
	private readonly DB_NAME = 'RecipeDB'
	private readonly STORES = {
		SAVED: 'saved_recipes',
		CACHED: 'cached_recipes',
		SEARCH_CACHE: 'search_results',
	}

	async init() {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.DB_NAME, 2)

			request.onerror = () => reject(request.error)
			request.onsuccess = () => {
				this.db = request.result
				resolve(this.db)
			}

			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result

				if (!db.objectStoreNames.contains(this.STORES.SAVED)) {
					db.createObjectStore(this.STORES.SAVED, { keyPath: 'id' })
				}
				if (!db.objectStoreNames.contains(this.STORES.CACHED)) {
					db.createObjectStore(this.STORES.CACHED, { keyPath: 'id' })
				}
				if (!db.objectStoreNames.contains(this.STORES.SEARCH_CACHE)) {
					db.createObjectStore(this.STORES.SEARCH_CACHE, { keyPath: 'query' })
				}
			}
		})
	}

	async saveRecipe(recipe: Recipe) {
		if (!this.db) await this.init()
		const recipeSaved = { ...recipe, isSaved: true }
		return Promise.all([
			this.saveToStore(this.STORES.SAVED, recipeSaved),
			this.cacheRecipe(recipeSaved),
		])
	}

	async deleteRecipe(id: number) {
		if (!this.db) await this.init()
		return this.deleteFromStore(this.STORES.SAVED, id)
	}

	async cacheRecipe(recipe: Recipe) {
		if (!this.db) await this.init()
		return this.saveToStore(this.STORES.CACHED, recipe)
	}

	async getSavedRecipes(): Promise<Recipe[]> {
		if (!this.db) await this.init()
		return this.getAllFromStore(this.STORES.SAVED)
	}

	async getCachedRecipe(id: number): Promise<Recipe | null> {
		if (!this.db) await this.init()
		try {
			const cachedRecipe = await this.getFromStore<any>(this.STORES.CACHED, id)
			return cachedRecipe
		} catch {
			return null
		}
	}

	async cacheInfiniteResults(
		data: PaginatedApiResponse<Recipe[]>,
		filters: RecipeFilters,
		pageParam: number
	) {
		if (!this.db) await this.init()
		const cacheKey = this.createCacheKey(filters, pageParam)
		return this.saveToStore(this.STORES.SEARCH_CACHE, {
			query: cacheKey,
			data,
			filters,
			pageParam,
		})
	}

	async getCachedInfiniteResults(
		filters: RecipeFilters,
		pageParam: number
	): Promise<PaginatedApiResponse<Recipe[]> | null> {
		if (!this.db) await this.init()
		try {
			const cacheKey = this.createCacheKey(filters, pageParam)
			const cache = await this.getFromStore<any>(
				this.STORES.SEARCH_CACHE,
				cacheKey
			)
			if (cache) {
				return cache?.data
			}
			return null
		} catch {
			return null
		}
	}

	private createCacheKey(filters: RecipeFilters, pageParam?: number): string {
		return `${filters.type || ''}-${filters.cuisine || ''}
		-${filters.diet || ''}-${pageParam || 0}`
	}

	private async deleteFromStore(storeName: string, id: number) {
		return new Promise((resolve, reject) => {
			const transaction = this.db!.transaction([storeName], 'readwrite')
			const store = transaction.objectStore(storeName)
			const request = store.delete(id)

			request.onerror = () => reject(request.error)
			request.onsuccess = () => resolve(request.result)
		})
	}

	private async saveToStore(storeName: string, data: any) {
		return new Promise((resolve, reject) => {
			const transaction = this.db!.transaction([storeName], 'readwrite')
			const store = transaction.objectStore(storeName)
			const request = store.put(data)

			request.onerror = () => reject(request.error)
			request.onsuccess = () => resolve(request.result)
		})
	}

	private async getFromStore<T>(storeName: string, key: any): Promise<T> {
		return new Promise((resolve, reject) => {
			const transaction = this.db!.transaction([storeName], 'readonly')
			const store = transaction.objectStore(storeName)
			const request = store.get(key)

			request.onerror = () => reject(request.error)
			request.onsuccess = () => resolve(request.result)
		})
	}

	private async getAllFromStore(storeName: string) {
		return new Promise<any[]>((resolve, reject) => {
			const transaction = this.db!.transaction([storeName], 'readonly')
			const store = transaction.objectStore(storeName)
			const request = store.getAll()

			request.onerror = () => reject(request.error)
			request.onsuccess = () => resolve(request.result)
		})
	}
}
