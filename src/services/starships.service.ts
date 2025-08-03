import { BaseSwapiService } from './base-swapi.service'
import type { Starship, StarshipsResponse } from '~/types'

/**
 * Starships Service for handling SWAPI Starships API calls
 * Extends BaseSwapiService to eliminate code duplication
 * Provides methods for fetching starships data with proper error handling
 */
export class StarshipsService extends BaseSwapiService {
  /**
   * Fetch starships with pagination and optional search
   * @param page - Page number (1-based)
   * @param search - Optional search query
   * @returns Promise<StarshipsResponse>
   */
  static getStarships = async (page: number = 1, search?: string): Promise<StarshipsResponse> =>
    BaseSwapiService.fetchResources<StarshipsResponse>('starships', page, search)

  /**
   * Fetch a specific starship by ID
   * @param id - Starship ID
   * @returns Promise<Starship>
   */
  static getStarshipById = async (id: number): Promise<Starship> => BaseSwapiService.fetchResourceById<Starship>('starships', id)
}
