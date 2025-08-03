/**
 * Planets Table Composable
 * Provides reusable planets table functionality for detail pages
 * Follows the same pattern as useFilmsTable, usePeopleTable, useStarshipsTable, useVehiclesTable, and useSpeciesTable
 */

import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { usePlanetsStore } from '~/stores/planets.store'
import { PlanetsService } from '~/services/planets.service'
import { ROUTE_NAMES } from '~/router/routes'
import type { Planet, PlanetsResponse, TablePagination, QTableRequestProps } from '~/types'

/**
 * Configuration interface for the planets table composable
 */
interface UsePlanetsTableConfig {
  /** Reactive reference to the resource that contains planets array */
  resourceRef: Ref<{ planets: string[] } | null>
  /** Function to extract ID from URL (from useDetail composable) */
  getIdFromUrl: (url: string) => number
}

/**
 * Return type for the composable
 */
interface UsePlanetsTableReturn {
  /** Reactive filter value for search */
  planetsFilter: Ref<string>
  /** Reactive pagination configuration */
  planetsPagination: ComputedRef<TablePagination>
  /** Filtered planets based on resource and search */
  filteredPlanets: ComputedRef<Planet[]>
  /** Handle planet row click navigation */
  handlePlanetRowClick: (planet: Planet) => void
  /** Handle search filter changes */
  handlePlanetsFilterChange: (newFilter: string) => void
  /** Handle table pagination/sorting requests */
  handlePlanetsTableRequest: (requestProps: QTableRequestProps) => void
  /** Planets store reference for loading state */
  planetsStore: ReturnType<typeof usePlanetsStore>
}

/**
 * Composable for managing planets table functionality in detail pages
 * Provides all necessary state, computed properties, and event handlers
 * for displaying and interacting with planets related to a specific resource
 *
 * @param config Configuration object with resource reference and utility functions
 * @returns Object with reactive data and methods for planets table
 */
export function usePlanetsTable(config: UsePlanetsTableConfig): UsePlanetsTableReturn {
  const router = useRouter()
  const planetsStore = usePlanetsStore()

  // Planets table state
  const planetsFilter = ref('')

  // Mutable pagination state
  const paginationState = ref({
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 5, // Smaller for detail page
  })

  // Get planets related to current resource
  const resourcePlanets = computed(() => {
    if (!config.resourceRef.value || !planetsStore.items.length) return []

    const planetIds = config.resourceRef.value.planets.map((url) => config.getIdFromUrl(url))
    return planetsStore.items.filter((planet) => planetIds.includes(config.getIdFromUrl(planet.url)))
  })

  // Apply local search filter to resource planets
  const filteredPlanets = computed(() => {
    if (!planetsFilter.value) return resourcePlanets.value

    const searchTerm = planetsFilter.value.toLowerCase()
    return resourcePlanets.value.filter(
      (planet) =>
        planet.name.toLowerCase().includes(searchTerm) ||
        planet.climate.toLowerCase().includes(searchTerm) ||
        planet.terrain.toLowerCase().includes(searchTerm),
    )
  })

  // Apply local pagination to filtered planets
  const paginatedPlanets = computed(() => {
    const start = (paginationState.value.page - 1) * paginationState.value.rowsPerPage
    const end = start + paginationState.value.rowsPerPage
    return filteredPlanets.value.slice(start, end)
  })

  // Reactive pagination that updates with filtered planets count
  const planetsPagination = computed<TablePagination>(() => ({
    ...paginationState.value,
    rowsNumber: filteredPlanets.value.length,
  }))

  // Handle planets table events
  const handlePlanetRowClick = (planet: Planet) => {
    const planetId = config.getIdFromUrl(planet.url)
    void router.push({ name: ROUTE_NAMES.PLANETS_DETAIL, params: { id: planetId } })
  }

  const handlePlanetsFilterChange = (newFilter: string) => {
    planetsFilter.value = newFilter
  }

  const handlePlanetsTableRequest = (requestProps: QTableRequestProps) => {
    // Update mutable pagination state (rowsNumber is handled by computed)
    paginationState.value = {
      sortBy: requestProps.pagination.sortBy,
      descending: requestProps.pagination.descending,
      page: requestProps.pagination.page,
      rowsPerPage: requestProps.pagination.rowsPerPage,
    }
  }

  /**
   * Load all planets from all pages to ensure complete dataset
   * This fixes the issue where only page 1 (10 planets) was loaded,
   * but films can reference planets from any page
   */
  const loadAllPlanets = async (): Promise<void> => {
    let page = 1
    let hasMore = true
    let allPlanets: Planet[] = []

    while (hasMore) {
      try {
        const response = await PlanetsService.getPlanets(page)
        allPlanets = [...allPlanets, ...response.results]
        hasMore = response.next !== null
        page++
      } catch (error) {
        console.error(`Failed to load planets page ${page}:`, error)
        break
      }
    }

    // Update store with all planets
    if (allPlanets.length > 0) {
      planetsStore.setItemsFromResponse({
        count: allPlanets.length,
        next: null,
        previous: null,
        results: allPlanets,
      } as PlanetsResponse)
    }
  }

  // Load all planets data when composable is used
  onMounted(async () => {
    if (planetsStore.items.length === 0) {
      await loadAllPlanets()
    }
  })

  return {
    planetsFilter,
    planetsPagination,
    filteredPlanets: paginatedPlanets,
    handlePlanetRowClick,
    handlePlanetsFilterChange,
    handlePlanetsTableRequest,
    planetsStore,
  }
}

/**
 * Type helper for creating properly typed planets table configs
 */
export type CreatePlanetsTableConfig = UsePlanetsTableConfig
