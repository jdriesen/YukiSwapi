/**
 * Generic Table Page Composable
 * Provides common functionality for all SWAPI resource table pages
 * Eliminates code duplication across PeoplePage, FilmsPage, VehiclesPage, etc.
 */

import { ref, onMounted, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { SwapiUtils } from '~/services'
import type { TablePagination, QTableRequestProps } from '~/types'

/**
 * Configuration interface for the table page composable
 */
interface TableConfig<T extends { url: string }> {
  /** The Pinia store instance (peopleStore, filmsStore, etc.) */
  store: {
    tableData: T[]
    isCurrentlyLoading: boolean
    currentError: string | null
    paginationInfo: { rowsNumber: number }
    onRequest: (props: { pagination: TablePagination; filter?: string }) => Promise<void>
    fetchItems: (page: number, filter?: string) => Promise<void>
    clearError: () => void
  }
  /** Route name for detail page navigation (ROUTE_NAMES.PERSON_DETAIL, etc.) */
  detailRouteName: string
  /** Default sort column (defaults to 'name') */
  defaultSortBy?: string
  /** Default rows per page (defaults to 10) */
  defaultRowsPerPage?: number
}

/**
 * Return type for the composable
 */
interface TableReturn<T extends { url: string }> {
  /** Reactive filter value */
  filter: Ref<string>
  /** Reactive pagination configuration */
  pagination: Ref<TablePagination>
  /** Handle table data requests (pagination, sorting, filtering) */
  onRequest: (props: QTableRequestProps) => Promise<void>
  /** Handle row click navigation */
  onRowClick: (item: T) => void
  /** Retry fetch on error */
  retryFetch: () => Promise<void>
}

/**
 * Generic composable for table page functionality
 * Encapsulates all common logic shared across SWAPI resource pages
 *
 * @param config Configuration object with store and routing information
 * @returns Object with reactive data and methods for table page
 */
export function useTable<T extends { url: string }>(config: TableConfig<T>): TableReturn<T> {
  const router = useRouter()

  // Destructure config with defaults
  const { store, detailRouteName, defaultSortBy = 'name', defaultRowsPerPage = 10 } = config

  // Reactive data - identical across all pages
  const filter = ref('')
  const pagination = ref<TablePagination>({
    sortBy: defaultSortBy,
    descending: false,
    page: 1,
    rowsPerPage: defaultRowsPerPage,
    rowsNumber: 0,
  })

  // Methods - identical logic across all pages
  const onRequest = async (props: QTableRequestProps) => {
    const requestProps: { pagination: TablePagination; filter?: string } = {
      pagination: props.pagination as TablePagination,
    }

    if (props.filter) {
      requestProps.filter = props.filter
    }

    await store.onRequest(requestProps)
    pagination.value = {
      ...props.pagination,
      rowsNumber: props.pagination.rowsNumber || 0,
    }
  }

  const onRowClick = (item: T) => {
    const itemId = SwapiUtils.extractIdFromUrl(item.url)
    void router.push({ name: detailRouteName, params: { id: itemId } })
  }

  const retryFetch = async () => {
    await store.fetchItems(pagination.value.page, filter.value)
  }

  // Lifecycle - identical across all pages
  onMounted(async () => {
    await store.fetchItems(1)
    pagination.value.rowsNumber = store.paginationInfo.rowsNumber
  })

  return {
    filter,
    pagination,
    onRequest,
    onRowClick,
    retryFetch,
  }
}

/**
 * Type helper for creating properly typed table page configs
 */
export type CreateTableConfig<T extends { url: string }> = TableConfig<T>
