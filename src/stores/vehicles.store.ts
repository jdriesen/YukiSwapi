import { createSwapiStore } from './base.store'
import { VehiclesService } from '~/services/vehicles.service'
import type { Vehicle, VehiclesResponse } from '~/types'

/**
 * Pinia store for managing SWAPI Vehicles data
 * Uses generic store factory to eliminate code duplication
 * Provides the same API as before: fetchItems, fetchItemById, etc.
 *
 * Usage in components:
 * - vehiclesStore.fetchItems(page, search) // was fetchVehicles
 * - vehiclesStore.fetchItemById(id) // was fetchVehicleById
 * - vehiclesStore.items // was vehicles
 * - vehiclesStore.currentItem // was currentVehicle
 * - vehiclesStore.isItemLoading // was isVehicleLoading
 */
export const useVehiclesStore = createSwapiStore<Vehicle, VehiclesResponse>({
  storeName: 'vehicles',
  resourceName: 'vehicles',
  fetchMany: (page, search) => VehiclesService.getVehicles(page, search),
  fetchOne: (id) => VehiclesService.getVehicleById(id),
  errorMessages: {
    fetchMany: 'Failed to fetch vehicles',
    fetchOne: 'Failed to fetch vehicle',
  },
})
