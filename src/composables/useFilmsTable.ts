/**
 * Films Table Composable
 * Provides reusable film table functionality for detail pages
 * Eliminates code duplication between StarshipsDetailPage, PeopleDetailPage, etc.
 * Column definitions are now handled at component level for proper i18n reactivity
 */

import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useFilmsStore } from '~/stores/films.store'
import { ROUTE_NAMES } from '~/router/routes'
import type { Film, TablePagination, QTableRequestProps } from '~/types'

/**
 * Configuration interface for the films table composable
 */
interface UseFilmsTableConfig {
  /** Reactive reference to the resource that contains films array */
  resourceRef: Ref<{ films: string[] } | null>
  /** Function to extract ID from URL (from useDetail composable) */
  getIdFromUrl: (url: string) => number
}

/**
 * Return type for the films table composable
 */
interface UseFilmsTableReturn {
  /** Reactive filter value for search */
  filmFilter: Ref<string>
  /** Reactive pagination configuration */
  filmPagination: ComputedRef<TablePagination>
  /** Filtered films based on resource and search */
  filteredFilms: ComputedRef<Film[]>
  /** Handle film row click navigation */
  handleFilmRowClick: (film: Film) => void
  /** Handle search filter changes */
  handleFilterChange: (newFilter: string) => void
  /** Handle table pagination/sorting requests */
  handleTableRequest: (requestProps: QTableRequestProps) => void
  /** Films store reference for loading state */
  filmsStore: ReturnType<typeof useFilmsStore>
}

/**
 * Composable for managing film table functionality in detail pages
 * Provides all necessary state, computed properties, and event handlers
 * for displaying and interacting with films related to a specific resource
 *
 * @param config Configuration object with resource reference and utility functions
 * @returns Object with reactive data and methods for film table
 */
export function useFilmsTable(config: UseFilmsTableConfig): UseFilmsTableReturn {
  const router = useRouter()
  const filmsStore = useFilmsStore()

  // Films table state
  const filmFilter = ref('')

  // Mutable pagination state
  const paginationState = ref({
    sortBy: 'title',
    descending: false,
    page: 1,
    rowsPerPage: 5, // Smaller for detail page
  })

  // Get films related to current resource
  const resourceFilms = computed(() => {
    if (!config.resourceRef.value || !filmsStore.items.length) return []

    const filmIds = config.resourceRef.value.films.map((url) => config.getIdFromUrl(url))
    return filmsStore.items.filter((film) => filmIds.includes(config.getIdFromUrl(film.url)))
  })

  // Apply local search filter to resource films
  const filteredFilms = computed(() => {
    if (!filmFilter.value) return resourceFilms.value

    const searchTerm = filmFilter.value.toLowerCase()
    return resourceFilms.value.filter(
      (film) =>
        film.title.toLowerCase().includes(searchTerm) ||
        film.director.toLowerCase().includes(searchTerm) ||
        film.producer.toLowerCase().includes(searchTerm),
    )
  })

  // Apply local pagination to filtered films
  const paginatedFilms = computed(() => {
    const start = (paginationState.value.page - 1) * paginationState.value.rowsPerPage
    const end = start + paginationState.value.rowsPerPage
    return filteredFilms.value.slice(start, end)
  })

  // Reactive pagination that updates with filtered films count
  const filmPagination = computed<TablePagination>(() => ({
    ...paginationState.value,
    rowsNumber: filteredFilms.value.length,
  }))

  // Handle film table events
  const handleFilmRowClick = (film: Film) => {
    const filmId = config.getIdFromUrl(film.url)
    void router.push({ name: ROUTE_NAMES.FILMS_DETAIL, params: { id: filmId } })
  }

  const handleFilterChange = (newFilter: string) => {
    filmFilter.value = newFilter
  }

  const handleTableRequest = (requestProps: QTableRequestProps) => {
    // Update mutable pagination state (rowsNumber is handled by computed)
    paginationState.value = {
      sortBy: requestProps.pagination.sortBy,
      descending: requestProps.pagination.descending,
      page: requestProps.pagination.page,
      rowsPerPage: requestProps.pagination.rowsPerPage,
    }
  }

  // Load films data when composable is used
  onMounted(async () => {
    if (filmsStore.items.length === 0) {
      await filmsStore.fetchItems(1)
    }
  })

  return {
    filmFilter,
    filmPagination,
    filteredFilms: paginatedFilms,
    handleFilmRowClick,
    handleFilterChange,
    handleTableRequest,
    filmsStore,
  }
}

/**
 * Type helper for creating properly typed film table configs
 */
export type CreateFilmsTableConfig = UseFilmsTableConfig
