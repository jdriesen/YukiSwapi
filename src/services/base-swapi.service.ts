import { api } from '~/boot/axios'
import type { ApiError } from '~/types'

/**
 * Base SWAPI Service providing generic methods for all SWAPI resources
 * Eliminates code duplication by providing reusable generic implementations
 * Follows DRY principle - single source of truth for all API logic
 */
export abstract class BaseSwapiService {
  /**
   * Generic method to fetch paginated resources with optional search
   * @param endpoint - API endpoint (e.g., 'people', 'planets', 'films')
   * @param page - Page number (1-based)
   * @param search - Optional search query
   * @returns Promise<TResponse> - Generic response type
   */
  protected static async fetchResources<TResponse>(endpoint: string, page: number = 1, search?: string): Promise<TResponse> {
    try {
      const params: Record<string, string | number> = {
        page,
      }

      if (search && search.trim()) {
        params.search = search.trim()
      }

      const response = await api.get<TResponse>(`${endpoint}/`, { params })
      return response.data
    } catch (error: unknown) {
      const apiError = this.handleApiError(error)
      throw new Error(apiError.message)
    }
  }

  /**
   * Generic method to fetch a specific resource by ID
   * @param endpoint - API endpoint (e.g., 'people', 'planets', 'films')
   * @param id - Resource ID
   * @returns Promise<TResource> - Generic resource type
   */
  protected static async fetchResourceById<TResource>(endpoint: string, id: number): Promise<TResource> {
    try {
      const response = await api.get<TResource>(`${endpoint}/${id}/`)
      return response.data
    } catch (error: unknown) {
      const apiError = this.handleApiError(error)
      throw new Error(apiError.message)
    }
  }

  /**
   * Extract ID from SWAPI URL
   * @param url - SWAPI resource URL
   * @returns number - Resource ID
   */
  static extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\/$/)
    return matches && matches[1] ? parseInt(matches[1], 10) : 0
  }

  /**
   * Handle API errors and convert to ApiError
   * @param error - Unknown error
   * @returns ApiError
   */
  private static handleApiError(error: unknown): ApiError {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response: { data?: { detail?: string; code?: string }; status: number }
      }
      // Server responded with error status
      return {
        message: axiosError.response.data?.detail || 'An error occurred while fetching data',
        status: axiosError.response.status,
        code: axiosError.response.data?.code || 'API_ERROR',
      }
    } else if (error && typeof error === 'object' && 'request' in error) {
      // Network error
      return {
        message: 'Network error. Please check your internet connection.',
        code: 'NETWORK_ERROR',
      }
    } else {
      // Other error
      const message = error instanceof Error ? error.message : 'An unexpected error occurred'
      return {
        message,
        code: 'UNKNOWN_ERROR',
      }
    }
  }
}
