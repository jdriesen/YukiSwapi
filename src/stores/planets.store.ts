import { createSwapiStore } from './base.store'
import { PlanetsService } from '~/services/planets.service'
import type { Planet, PlanetsResponse } from '~/types'

/**
 * Pinia store for managing SWAPI Planets data
 * Uses generic store factory to eliminate code duplication
 * Provides the same API as before: fetchItems, fetchItemById, etc.
 *
 * Usage in components:
 * - planetsStore.fetchItems(page, search) // was fetchPlanets
 * - planetsStore.fetchItemById(id) // was fetchPlanetById
 * - planetsStore.items // was planets
 * - planetsStore.currentItem // was currentPlanet
 * - planetsStore.isItemLoading // was isPlanetLoading
 */
export const usePlanetsStore = createSwapiStore<Planet, PlanetsResponse>({
  storeName: 'planets',
  resourceName: 'planets',
  fetchMany: (page, search) => PlanetsService.getPlanets(page, search),
  fetchOne: (id) => PlanetsService.getPlanetById(id),
  errorMessages: {
    fetchMany: 'Failed to fetch planets',
    fetchOne: 'Failed to fetch planet',
  },
})
