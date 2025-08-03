/**
 * Species Table Composable
 * Provides reusable species table functionality for detail pages
 * Follows the same pattern as useFilmsTable, usePeopleTable, useStarshipsTable, and useVehiclesTable
 */

import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useSpeciesStore } from '~/stores/species.store'
import { SpeciesService } from '~/services/species.service'
import { ROUTE_NAMES } from '~/router/routes'
import type { Species, SpeciesResponse, TablePagination, QTableRequestProps } from '~/types'

/**
 * Configuration interface for the species table composable
 */
interface UseSpeciesTableConfig {
  /** Reactive reference to the resource that contains species array */
  resourceRef: Ref<{ species: string[] } | null>
  /** Function to extract ID from URL (from useDetail composable) */
  getIdFromUrl: (url: string) => number
}

/**
 * Return type for the composable
 */
interface UseSpeciesTableReturn {
  /** Reactive filter value for search */
  speciesFilter: Ref<string>
  /** Reactive pagination configuration */
  speciesPagination: ComputedRef<TablePagination>
  /** Filtered species based on resource and search */
  filteredSpecies: ComputedRef<Species[]>
  /** Handle species row click navigation */
  handleSpeciesRowClick: (species: Species) => void
  /** Handle search filter changes */
  handleSpeciesFilterChange: (newFilter: string) => void
  /** Handle table pagination/sorting requests */
  handleSpeciesTableRequest: (requestProps: QTableRequestProps) => void
  /** Species store reference for loading state */
  speciesStore: ReturnType<typeof useSpeciesStore>
}

/**
 * Composable for managing species table functionality in detail pages
 * Provides all necessary state, computed properties, and event handlers
 * for displaying and interacting with species related to a specific resource
 *
 * @param config Configuration object with resource reference and utility functions
 * @returns Object with reactive data and methods for species table
 */
export function useSpeciesTable(config: UseSpeciesTableConfig): UseSpeciesTableReturn {
  const router = useRouter()
  const speciesStore = useSpeciesStore()

  // Species table state
  const speciesFilter = ref('')

  // Mutable pagination state
  const paginationState = ref({
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 5, // Smaller for detail page
  })

  // Get species related to current resource
  const resourceSpecies = computed(() => {
    if (!config.resourceRef.value || !speciesStore.items.length) return []

    const speciesIds = config.resourceRef.value.species.map((url) => config.getIdFromUrl(url))
    return speciesStore.items.filter((species) => speciesIds.includes(config.getIdFromUrl(species.url)))
  })

  // Apply local search filter to resource species
  const filteredSpecies = computed(() => {
    if (!speciesFilter.value) return resourceSpecies.value

    const searchTerm = speciesFilter.value.toLowerCase()
    return resourceSpecies.value.filter(
      (species) =>
        species.name.toLowerCase().includes(searchTerm) ||
        species.classification.toLowerCase().includes(searchTerm) ||
        species.language.toLowerCase().includes(searchTerm),
    )
  })

  // Apply local pagination to filtered species
  const paginatedSpecies = computed(() => {
    const start = (paginationState.value.page - 1) * paginationState.value.rowsPerPage
    const end = start + paginationState.value.rowsPerPage
    return filteredSpecies.value.slice(start, end)
  })

  // Reactive pagination that updates with filtered species count
  const speciesPagination = computed<TablePagination>(() => ({
    ...paginationState.value,
    rowsNumber: filteredSpecies.value.length,
  }))

  // Handle species table events
  const handleSpeciesRowClick = (species: Species) => {
    const speciesId = config.getIdFromUrl(species.url)
    void router.push({ name: ROUTE_NAMES.SPECIES_DETAIL, params: { id: speciesId } })
  }

  const handleSpeciesFilterChange = (newFilter: string) => {
    speciesFilter.value = newFilter
  }

  const handleSpeciesTableRequest = (requestProps: QTableRequestProps) => {
    // Update mutable pagination state (rowsNumber is handled by computed)
    paginationState.value = {
      sortBy: requestProps.pagination.sortBy,
      descending: requestProps.pagination.descending,
      page: requestProps.pagination.page,
      rowsPerPage: requestProps.pagination.rowsPerPage,
    }
  }

  /**
   * Load all species from all pages to ensure complete dataset
   * This fixes the issue where only page 1 (10 species) was loaded,
   * but films can reference species from any page
   */
  const loadAllSpecies = async (): Promise<void> => {
    let page = 1
    let hasMore = true
    let allSpecies: Species[] = []

    while (hasMore) {
      try {
        const response = await SpeciesService.getSpecies(page)
        allSpecies = [...allSpecies, ...response.results]
        hasMore = response.next !== null
        page++
      } catch (error) {
        console.error(`Failed to load species page ${page}:`, error)
        break
      }
    }

    // Update store with all species
    if (allSpecies.length > 0) {
      speciesStore.setItemsFromResponse({
        count: allSpecies.length,
        next: null,
        previous: null,
        results: allSpecies,
      } as SpeciesResponse)
    }
  }

  // Load all species data when composable is used
  onMounted(async () => {
    if (speciesStore.items.length === 0) {
      await loadAllSpecies()
    }
  })

  return {
    speciesFilter,
    speciesPagination,
    filteredSpecies: paginatedSpecies,
    handleSpeciesRowClick,
    handleSpeciesFilterChange,
    handleSpeciesTableRequest,
    speciesStore,
  }
}

/**
 * Type helper for creating properly typed species table configs
 */
export type CreateSpeciesTableConfig = UseSpeciesTableConfig
