/**
 * Generic Detail Page Composable
 * Provides common functionality for all SWAPI resource detail pages
 * Eliminates code duplication across StarshipsDetailPage, PeopleDetailPage, etc.
 */

import { computed, onMounted, onUnmounted, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { SwapiUtils } from '~/services'
import type { RouteNameType } from '~/router/routes'

/**
 * Configuration interface for the detail page composable
 */
interface DetailConfig<T> {
  /** The Pinia store instance (starshipsStore, peopleStore, etc.) */
  store: {
    currentItem: T | null
    isItemLoading: boolean
    currentError: string | null
    fetchItemById: (id: number) => Promise<void>
    clearCurrentItem: () => void
    clearError: () => void
    error: string | null
  }
  /** Route name for list page navigation (ROUTE_NAMES.STARSHIPS, etc.) */
  listRouteName: RouteNameType
  /** Resource name for error messages ('starship', 'person', etc.) */
  resourceName: string
  /** Custom error message (optional) */
  customErrorMessage?: string
  /** Whether to auto-fetch on mount (defaults to true) */
  autoFetch?: boolean
  /** Whether to clear data on unmount (defaults to true) */
  clearOnUnmount?: boolean
  /** Custom ID validation function (optional) */
  validateId?: (id: string) => boolean
}

/**
 * Return type for the composable
 */
interface DetailReturn<T> {
  /** Reactive current item */
  currentItem: Ref<T | null>
  /** Navigate back to list page */
  goBack: () => void
  /** Retry fetching the current item */
  retryFetch: () => Promise<void>
  /** Extract ID from SWAPI URL */
  getIdFromUrl: (url: string) => number
}

/**
 * Generic composable for detail page functionality
 * Encapsulates all common logic shared across SWAPI resource detail pages
 *
 * @param props Component props containing the ID
 * @param config Configuration object with store and routing information
 * @returns Object with reactive data and methods for detail page
 */
export function useDetail<T>(props: { id: string }, config: DetailConfig<T>): DetailReturn<T> {
  const router = useRouter()

  // Destructure config with defaults
  const { store, listRouteName, resourceName, customErrorMessage, autoFetch = true, clearOnUnmount = true, validateId } = config

  // Computed properties - identical across all pages
  const currentItem = computed(() => store.currentItem)

  // Methods - identical logic across all pages
  const goBack = () => {
    void router.push({ name: listRouteName })
  }

  const retryFetch = async () => {
    const itemId = parseInt(props.id, 10)
    if (!isNaN(itemId)) {
      await store.fetchItemById(itemId)
    }
  }

  const getIdFromUrl = (url: string): number => {
    return SwapiUtils.extractIdFromUrl(url)
  }

  // Helper function to validate and parse ID
  const parseAndValidateId = (id: string): number | null => {
    // Custom validation if provided
    if (validateId && !validateId(id)) {
      return null
    }

    const parsedId = parseInt(id, 10)
    return isNaN(parsedId) ? null : parsedId
  }

  // Lifecycle - identical across all pages
  onMounted(async () => {
    if (!autoFetch) return

    const itemId = parseAndValidateId(props.id)
    if (itemId !== null) {
      await store.fetchItemById(itemId)
    } else {
      const errorMessage = customErrorMessage || `Invalid ${resourceName} ID`
      store.error = errorMessage
    }
  })

  onUnmounted(() => {
    if (clearOnUnmount) {
      store.clearCurrentItem()
      store.clearError()
    }
  })

  return {
    currentItem,
    goBack,
    retryFetch,
    getIdFromUrl,
  }
}

/**
 * Type helper for creating properly typed detail page configs
 */
export type CreateDetailConfig<T> = DetailConfig<T>
