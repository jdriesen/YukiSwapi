import { BaseSwapiService } from './base-swapi.service'
import type { Species, SpeciesResponse } from '~/types'

/**
 * Species Service for handling SWAPI Species API calls
 * Extends BaseSwapiService to eliminate code duplication
 * Provides methods for fetching species data with proper error handling
 */
export class SpeciesService extends BaseSwapiService {
  /**
   * Fetch species with pagination and optional search
   * @param page - Page number (1-based)
   * @param search - Optional search query
   * @returns Promise<SpeciesResponse>
   */
  static getSpecies = async (page: number = 1, search?: string): Promise<SpeciesResponse> =>
    BaseSwapiService.fetchResources<SpeciesResponse>('species', page, search)

  /**
   * Fetch a specific species by ID
   * @param id - Species ID
   * @returns Promise<Species>
   */
  static getSpeciesById = async (id: number): Promise<Species> => BaseSwapiService.fetchResourceById<Species>('species', id)
}
