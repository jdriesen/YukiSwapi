/**
 * Generic SWAPI Store Factory
 * Creates type-safe Pinia stores for SWAPI resources following DRY principles
 * Eliminates code duplication across People, Planets, Films, etc. stores
 */

import { defineStore, acceptHMRUpdate } from 'pinia'
import type { UnwrapRef } from 'vue'
import type { BaseResource, BaseResponse, BaseState, StoreConfig } from '~/types/store'
import type { TablePagination } from '~/types'

/**
 * Generic store factory for SWAPI resources
 * Creates a fully functional Pinia store with caching, pagination, search, and error handling
 *
 * @param config - Configuration object defining resource-specific behavior
 * @returns Pinia store with complete SWAPI functionality
 */
export function createSwapiStore<T extends BaseResource, R extends BaseResponse<T>>(config: StoreConfig<T, R>) {
  const store = defineStore(config.storeName, {
    state: (): BaseState<T, R> => ({
      items: [],
      currentItem: null,
      isLoading: false,
      isLoadingItem: false,
      error: null,
      searchQuery: '',
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      cache: new Map(),
      itemCache: new Map(),
    }),

    getters: {
      /**
       * Get table data formatted for q-table
       */
      tableData: (state) => state.items,

      /**
       * Check if currently loading list
       */
      isCurrentlyLoading: (state) => state.isLoading,

      /**
       * Check if item detail is loading
       */
      isItemLoading: (state) => state.isLoadingItem,

      /**
       * Get current error message
       */
      currentError: (state) => state.error,

      /**
       * Get current search query
       */
      currentSearchQuery: (state) => state.searchQuery,

      /**
       * Get pagination info
       */
      paginationInfo: (state) => state.pagination,
    },

    actions: {
      /**
       * Fetch items with pagination and optional search
       * Includes 10-minute caching
       */
      async fetchItems(page: number = 1, search?: string): Promise<void> {
        const cacheKey = `${config.resourceName}_${page}_${search || ''}`
        const now = Date.now()
        const cached = this.cache.get(cacheKey)

        // Check cache (10 minutes TTL)
        if (cached && now - cached.timestamp < cached.ttl) {
          this.setItemsFromResponse(cached.data as R)
          return
        }

        this.isLoading = true
        this.error = null

        try {
          const response = await config.fetchMany(page, search)

          // Cache the response for 10 minutes
          this.cache.set(cacheKey, {
            data: response as unknown as UnwrapRef<R>,
            timestamp: now,
            ttl: 10 * 60 * 1000, // 10 minutes
          })

          this.setItemsFromResponse(response)
          this.searchQuery = search || ''
        } catch (error) {
          this.error = error instanceof Error ? error.message : config.errorMessages.fetchMany
          this.items = [] as unknown as typeof this.items
          this.pagination.rowsNumber = 0
        } finally {
          this.isLoading = false
        }
      },

      /**
       * Fetch a specific item by ID with caching
       */
      async fetchItemById(id: number): Promise<void> {
        const now = Date.now()
        const cached = this.itemCache.get(id)

        // Check cache (10 minutes TTL)
        if (cached && now - cached.timestamp < cached.ttl) {
          this.currentItem = cached.data as unknown as typeof this.currentItem
          return
        }

        this.isLoadingItem = true
        this.error = null

        try {
          const item = await config.fetchOne(id)

          // Cache the item for 10 minutes
          this.itemCache.set(id, {
            data: item as unknown as UnwrapRef<T>,
            timestamp: now,
            ttl: 10 * 60 * 1000, // 10 minutes
          })

          this.currentItem = item as unknown as typeof this.currentItem
        } catch (error) {
          this.error = error instanceof Error ? error.message : config.errorMessages.fetchOne
          this.currentItem = null
        } finally {
          this.isLoadingItem = false
        }
      },

      /**
       * Handle q-table pagination request
       */
      async onRequest(props: { pagination: TablePagination; filter?: string }): Promise<void> {
        const { page, rowsPerPage } = props.pagination
        const filter = props.filter

        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage

        await this.fetchItems(page, filter)
      },

      /**
       * Clear all caches
       */
      clearCache(): void {
        this.cache.clear()
        this.itemCache.clear()
      },

      /**
       * Clear current error
       */
      clearError(): void {
        this.error = null
      },

      /**
       * Clear current item
       */
      clearCurrentItem(): void {
        this.currentItem = null
      },

      /**
       * Set items data from API response
       */
      setItemsFromResponse(response: R): void {
        this.items = response.results as unknown as typeof this.items
        this.pagination.rowsNumber = response.count
      },
    },
  })

  // Hot Module Replacement support
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
  }

  return store
}
