/**
 * Vehicles Table Composable
 * Provides reusable vehicles table functionality for detail pages
 * Follows the same pattern as useFilmsTable, usePeopleTable, and useStarshipsTable
 */

import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useVehiclesStore } from '~/stores/vehicles.store'
import { VehiclesService } from '~/services/vehicles.service'
import { ROUTE_NAMES } from '~/router/routes'
import type { Vehicle, VehiclesResponse, TablePagination, QTableRequestProps } from '~/types'

/**
 * Configuration interface for the vehicles table composable
 */
interface UseVehiclesTableConfig {
  /** Reactive reference to the resource that contains vehicles array */
  resourceRef: Ref<{ vehicles: string[] } | null>
  /** Function to extract ID from URL (from useDetail composable) */
  getIdFromUrl: (url: string) => number
}

/**
 * Return type for the composable
 */
interface UseVehiclesTableReturn {
  /** Reactive filter value for search */
  vehiclesFilter: Ref<string>
  /** Reactive pagination configuration */
  vehiclesPagination: ComputedRef<TablePagination>
  /** Filtered vehicles based on resource and search */
  filteredVehicles: ComputedRef<Vehicle[]>
  /** Handle vehicle row click navigation */
  handleVehicleRowClick: (vehicle: Vehicle) => void
  /** Handle search filter changes */
  handleVehiclesFilterChange: (newFilter: string) => void
  /** Handle table pagination/sorting requests */
  handleVehiclesTableRequest: (requestProps: QTableRequestProps) => void
  /** Vehicles store reference for loading state */
  vehiclesStore: ReturnType<typeof useVehiclesStore>
}

/**
 * Composable for managing vehicles table functionality in detail pages
 * Provides all necessary state, computed properties, and event handlers
 * for displaying and interacting with vehicles related to a specific resource
 *
 * @param config Configuration object with resource reference and utility functions
 * @returns Object with reactive data and methods for vehicles table
 */
export function useVehiclesTable(config: UseVehiclesTableConfig): UseVehiclesTableReturn {
  const router = useRouter()
  const vehiclesStore = useVehiclesStore()

  // Vehicles table state
  const vehiclesFilter = ref('')

  // Mutable pagination state
  const paginationState = ref({
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 5, // Smaller for detail page
  })

  // Get vehicles related to current resource
  const resourceVehicles = computed(() => {
    if (!config.resourceRef.value || !vehiclesStore.items.length) return []

    const vehicleIds = config.resourceRef.value.vehicles.map((url) => config.getIdFromUrl(url))
    return vehiclesStore.items.filter((vehicle) => vehicleIds.includes(config.getIdFromUrl(vehicle.url)))
  })

  // Apply local search filter to resource vehicles
  const filteredVehicles = computed(() => {
    if (!vehiclesFilter.value) return resourceVehicles.value

    const searchTerm = vehiclesFilter.value.toLowerCase()
    return resourceVehicles.value.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm) ||
        vehicle.model.toLowerCase().includes(searchTerm) ||
        vehicle.vehicle_class.toLowerCase().includes(searchTerm),
    )
  })

  // Apply local pagination to filtered vehicles
  const paginatedVehicles = computed(() => {
    const start = (paginationState.value.page - 1) * paginationState.value.rowsPerPage
    const end = start + paginationState.value.rowsPerPage
    return filteredVehicles.value.slice(start, end)
  })

  // Reactive pagination that updates with filtered vehicles count
  const vehiclesPagination = computed<TablePagination>(() => ({
    ...paginationState.value,
    rowsNumber: filteredVehicles.value.length,
  }))

  // Handle vehicles table events
  const handleVehicleRowClick = (vehicle: Vehicle) => {
    const vehicleId = config.getIdFromUrl(vehicle.url)
    void router.push({ name: ROUTE_NAMES.VEHICLES_DETAIL, params: { id: vehicleId } })
  }

  const handleVehiclesFilterChange = (newFilter: string) => {
    vehiclesFilter.value = newFilter
  }

  const handleVehiclesTableRequest = (requestProps: QTableRequestProps) => {
    // Update mutable pagination state (rowsNumber is handled by computed)
    paginationState.value = {
      sortBy: requestProps.pagination.sortBy,
      descending: requestProps.pagination.descending,
      page: requestProps.pagination.page,
      rowsPerPage: requestProps.pagination.rowsPerPage,
    }
  }

  /**
   * Load all vehicles from all pages to ensure complete dataset
   * This fixes the issue where only page 1 (10 vehicles) was loaded,
   * but films can reference vehicles from any page
   */
  const loadAllVehicles = async (): Promise<void> => {
    let page = 1
    let hasMore = true
    let allVehicles: Vehicle[] = []

    while (hasMore) {
      try {
        const response = await VehiclesService.getVehicles(page)
        allVehicles = [...allVehicles, ...response.results]
        hasMore = response.next !== null
        page++
      } catch (error) {
        console.error(`Failed to load vehicles page ${page}:`, error)
        break
      }
    }

    // Update store with all vehicles
    if (allVehicles.length > 0) {
      vehiclesStore.setItemsFromResponse({
        count: allVehicles.length,
        next: null,
        previous: null,
        results: allVehicles,
      } as VehiclesResponse)
    }
  }

  // Load all vehicles data when composable is used
  onMounted(async () => {
    if (vehiclesStore.items.length === 0) {
      await loadAllVehicles()
    }
  })

  return {
    vehiclesFilter,
    vehiclesPagination,
    filteredVehicles: paginatedVehicles,
    handleVehicleRowClick,
    handleVehiclesFilterChange,
    handleVehiclesTableRequest,
    vehiclesStore,
  }
}

/**
 * Type helper for creating properly typed vehicles table configs
 */
export type CreateVehiclesTableConfig = UseVehiclesTableConfig
