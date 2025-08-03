/**
 * Base types and interfaces for generic SWAPI store implementation
 * Enables DRY principle compliance across all resource stores
 */

import type { CacheEntry, SwapiResource, SwapiResponse } from './base.type'
import type { TablePagination } from './table.type'

/**
 * Base type for all SWAPI resources
 * Re-exported from base.type.ts for consistency
 */
export type BaseResource = SwapiResource

/**
 * Base type for paginated SWAPI responses
 * Re-exported from base.type.ts for consistency
 * Generic type T must extend BaseResource
 */
export type BaseResponse<T extends BaseResource> = SwapiResponse<T>

/**
 * Configuration interface for creating SWAPI stores
 * Defines the required configuration for the generic store factory
 */
export interface StoreConfig<T extends BaseResource, R extends BaseResponse<T>> {
  storeName: string
  resourceName: string
  fetchMany: (page: number, search?: string) => Promise<R>
  fetchOne: (id: number) => Promise<T>
  errorMessages: {
    fetchMany: string
    fetchOne: string
  }
}

/**
 * Base state interface for generic SWAPI stores
 * Contains all common state properties
 */
export interface BaseState<T extends BaseResource, R extends BaseResponse<T>> {
  items: T[]
  currentItem: T | null
  isLoading: boolean
  isLoadingItem: boolean
  error: string | null
  searchQuery: string
  pagination: {
    page: number
    rowsPerPage: number
    rowsNumber: number
  }
  cache: Map<string, CacheEntry<R>>
  itemCache: Map<number, CacheEntry<T>>
}

/**
 * Base getters interface for generic SWAPI stores
 * Defines the common computed properties
 */
export interface BaseGetters<T extends BaseResource> {
  tableData: T[]
  isCurrentlyLoading: boolean
  isItemLoading: boolean
  currentError: string | null
  currentSearchQuery: string
  paginationInfo: {
    page: number
    rowsPerPage: number
    rowsNumber: number
  }
}

/**
 * Base actions interface for generic SWAPI stores
 * Defines the common store actions
 */
export interface BaseActions<T extends BaseResource, R extends BaseResponse<T>> {
  fetchItems(page?: number, search?: string): Promise<void>
  fetchItemById(id: number): Promise<void>
  onRequest(props: { pagination: TablePagination; filter?: string }): Promise<void>
  clearCache(): void
  clearError(): void
  clearCurrentItem(): void
  setItemsFromResponse(response: R): void
}
