import { BaseSwapiService } from './base-swapi.service'
import type { Film, FilmsResponse } from '~/types'

/**
 * Films Service for handling SWAPI Films API calls
 * Extends BaseSwapiService to eliminate code duplication
 * Provides methods for fetching films data with proper error handling
 */
export class FilmsService extends BaseSwapiService {
  /**
   * Fetch films with pagination and optional search
   * @param page - Page number (1-based)
   * @param search - Optional search query
   * @returns Promise<FilmsResponse>
   */
  static getFilms = async (page: number = 1, search?: string): Promise<FilmsResponse> =>
    BaseSwapiService.fetchResources<FilmsResponse>('films', page, search)

  /**
   * Fetch a specific film by ID
   * @param id - Film ID
   * @returns Promise<Film>
   */
  static getFilmById = async (id: number): Promise<Film> => BaseSwapiService.fetchResourceById<Film>('films', id)
}
