import { createSwapiStore } from './base.store'
import { StarshipsService } from '~/services/starships.service'
import type { Starship, StarshipsResponse } from '~/types'

/**
 * Pinia store for managing SWAPI Starships data
 * Uses generic store factory to eliminate code duplication
 * Provides the same API as before: fetchItems, fetchItemById, etc.
 *
 * Usage in components:
 * - starshipsStore.fetchItems(page, search) // was fetchStarships
 * - starshipsStore.fetchItemById(id) // was fetchStarshipById
 * - starshipsStore.items // was starships
 * - starshipsStore.currentItem // was currentStarship
 * - starshipsStore.isItemLoading // was isStarshipLoading
 */
export const useStarshipsStore = createSwapiStore<Starship, StarshipsResponse>({
  storeName: 'starships',
  resourceName: 'starships',
  fetchMany: (page, search) => StarshipsService.getStarships(page, search),
  fetchOne: (id) => StarshipsService.getStarshipById(id),
  errorMessages: {
    fetchMany: 'Failed to fetch starships',
    fetchOne: 'Failed to fetch starship',
  },
})
