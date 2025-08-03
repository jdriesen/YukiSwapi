/**
 * Starships Table Composable
 * Provides reusable starships table functionality for detail pages
 * Follows the same pattern as useFilmsTable and usePeopleTable
 */

import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useStarshipsStore } from '~/stores/starships.store'
import { StarshipsService } from '~/services/starships.service'
import { ROUTE_NAMES } from '~/router/routes'
import type { Starship, StarshipsResponse, TablePagination, QTableRequestProps } from '~/types'

/**
 * Configuration interface for the starships table composable
 */
interface UseStarshipsTableConfig {
  /** Reactive reference to the resource that contains starships array */
  resourceRef: Ref<{ starships: string[] } | null>
  /** Function to extract ID from URL (from useDetail composable) */
  getIdFromUrl: (url: string) => number
}

/**
 * Return type for the composable
 */
interface UseStarshipsTableReturn {
  /** Reactive filter value for search */
  starshipsFilter: Ref<string>
  /** Reactive pagination configuration */
  starshipsPagination: ComputedRef<TablePagination>
  /** Filtered starships based on resource and search */
  filteredStarships: ComputedRef<Starship[]>
  /** Handle starship row click navigation */
  handleStarshipRowClick: (starship: Starship) => void
  /** Handle search filter changes */
  handleStarshipsFilterChange: (newFilter: string) => void
  /** Handle table pagination/sorting requests */
  handleStarshipsTableRequest: (requestProps: QTableRequestProps) => void
  /** Starships store reference for loading state */
  starshipsStore: ReturnType<typeof useStarshipsStore>
}

/**
 * Composable for managing starships table functionality in detail pages
 * Provides all necessary state, computed properties, and event handlers
 * for displaying and interacting with starships related to a specific resource
 *
 * @param config Configuration object with resource reference and utility functions
 * @returns Object with reactive data and methods for starships table
 */
export function useStarshipsTable(config: UseStarshipsTableConfig): UseStarshipsTableReturn {
  const router = useRouter()
  const starshipsStore = useStarshipsStore()

  // Starships table state
  const starshipsFilter = ref('')

  // Mutable pagination state
  const paginationState = ref({
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 5, // Smaller for detail page
  })

  // Get starships related to current resource
  const resourceStarships = computed(() => {
    if (!config.resourceRef.value || !starshipsStore.items.length) return []

    const starshipIds = config.resourceRef.value.starships.map((url) => config.getIdFromUrl(url))
    return starshipsStore.items.filter((starship) => starshipIds.includes(config.getIdFromUrl(starship.url)))
  })

  // Apply local search filter to resource starships
  const filteredStarships = computed(() => {
    if (!starshipsFilter.value) return resourceStarships.value

    const searchTerm = starshipsFilter.value.toLowerCase()
    return resourceStarships.value.filter(
      (starship) =>
        starship.name.toLowerCase().includes(searchTerm) ||
        starship.model.toLowerCase().includes(searchTerm) ||
        starship.starship_class.toLowerCase().includes(searchTerm),
    )
  })

  // Apply local pagination to filtered starships
  const paginatedStarships = computed(() => {
    const start = (paginationState.value.page - 1) * paginationState.value.rowsPerPage
    const end = start + paginationState.value.rowsPerPage
    return filteredStarships.value.slice(start, end)
  })

  // Reactive pagination that updates with filtered starships count
  const starshipsPagination = computed<TablePagination>(() => ({
    ...paginationState.value,
    rowsNumber: filteredStarships.value.length,
  }))

  // Handle starships table events
  const handleStarshipRowClick = (starship: Starship) => {
    const starshipId = config.getIdFromUrl(starship.url)
    void router.push({ name: ROUTE_NAMES.STARSHIPS_DETAIL, params: { id: starshipId } })
  }

  const handleStarshipsFilterChange = (newFilter: string) => {
    starshipsFilter.value = newFilter
  }

  const handleStarshipsTableRequest = (requestProps: QTableRequestProps) => {
    // Update mutable pagination state (rowsNumber is handled by computed)
    paginationState.value = {
      sortBy: requestProps.pagination.sortBy,
      descending: requestProps.pagination.descending,
      page: requestProps.pagination.page,
      rowsPerPage: requestProps.pagination.rowsPerPage,
    }
  }

  /**
   * Load all starships from all pages to ensure complete dataset
   * This fixes the issue where only page 1 (10 starships) was loaded,
   * but films can reference starships from any page
   */
  const loadAllStarships = async (): Promise<void> => {
    let page = 1
    let hasMore = true
    let allStarships: Starship[] = []

    while (hasMore) {
      try {
        const response = await StarshipsService.getStarships(page)
        allStarships = [...allStarships, ...response.results]
        hasMore = response.next !== null
        page++
      } catch (error) {
        console.error(`Failed to load starships page ${page}:`, error)
        break
      }
    }

    // Update store with all starships
    if (allStarships.length > 0) {
      starshipsStore.setItemsFromResponse({
        count: allStarships.length,
        next: null,
        previous: null,
        results: allStarships,
      } as StarshipsResponse)
    }
  }

  // Load all starships data when composable is used
  onMounted(async () => {
    if (starshipsStore.items.length === 0) {
      await loadAllStarships()
    }
  })

  return {
    starshipsFilter,
    starshipsPagination,
    filteredStarships: paginatedStarships,
    handleStarshipRowClick,
    handleStarshipsFilterChange,
    handleStarshipsTableRequest,
    starshipsStore,
  }
}

/**
 * Type helper for creating properly typed starships table configs
 */
export type CreateStarshipsTableConfig = UseStarshipsTableConfig
