import { createSwapiStore } from './base.store'
import { SpeciesService } from '~/services/species.service'
import type { Species, SpeciesResponse } from '~/types'

/**
 * Pinia store for managing SWAPI Species data
 * Uses generic store factory to eliminate code duplication
 * Provides the same API as before: fetchItems, fetchItemById, etc.
 *
 * Usage in components:
 * - speciesStore.fetchItems(page, search) // was fetchSpecies
 * - speciesStore.fetchItemById(id) // was fetchSpeciesById
 * - speciesStore.items // was species
 * - speciesStore.currentItem // was currentSpecies
 * - speciesStore.isItemLoading // was isSpeciesLoading
 */
export const useSpeciesStore = createSwapiStore<Species, SpeciesResponse>({
  storeName: 'species',
  resourceName: 'species',
  fetchMany: (page, search) => SpeciesService.getSpecies(page, search),
  fetchOne: (id) => SpeciesService.getSpeciesById(id),
  errorMessages: {
    fetchMany: 'Failed to fetch species',
    fetchOne: 'Failed to fetch species',
  },
})
