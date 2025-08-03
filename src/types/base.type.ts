/**
 * Base TypeScript interfaces for SWAPI integration
 * Contains shared interfaces used across all SWAPI resource types
 */

/**
 * Base interface for all SWAPI resources
 * Contains common fields that all SWAPI resources share
 */
export interface SwapiResource {
  url: string
  created: string
  edited: string
}

/**
 * Generic paginated response from SWAPI endpoints
 * Eliminates code duplication across all resource response types
 * @template T - The resource type (Person, Planet, Film, etc.)
 */
export interface SwapiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/**
 * API Error interface for error handling
 */
export interface ApiError {
  message: string
  status?: number
  code?: string
}

/**
 * Cache entry interface for storing cached data
 * @template T - The type of data being cached
 */
export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // Time to live in milliseconds
}
