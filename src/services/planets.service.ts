import { BaseSwapiService } from './base-swapi.service'
import type { Planet, PlanetsResponse } from '~/types'

/**
 * Planets Service for handling SWAPI Planets API calls
 * Extends BaseSwapiService to eliminate code duplication
 * Provides methods for fetching planets data with proper error handling
 */
export class PlanetsService extends BaseSwapiService {
  /**
   * Fetch planets with pagination and optional search
   * @param page - Page number (1-based)
   * @param search - Optional search query
   * @returns Promise<PlanetsResponse>
   */
  static getPlanets = async (page: number = 1, search?: string): Promise<PlanetsResponse> =>
    BaseSwapiService.fetchResources<PlanetsResponse>('planets', page, search)

  /**
   * Fetch a specific planet by ID
   * @param id - Planet ID
   * @returns Promise<Planet>
   */
  static getPlanetById = async (id: number): Promise<Planet> => BaseSwapiService.fetchResourceById<Planet>('planets', id)
}
