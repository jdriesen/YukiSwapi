import { BaseSwapiService } from './base-swapi.service'
import type { Person, PeopleResponse } from '~/types'

/**
 * People Service for handling SWAPI People API calls
 * Extends BaseSwapiService to eliminate code duplication
 * Provides methods for fetching people data with proper error handling
 */
export class PeopleService extends BaseSwapiService {
  /**
   * Fetch people with pagination and optional search
   * @param page - Page number (1-based)
   * @param search - Optional search query
   * @returns Promise<PeopleResponse>
   */
  static getPeople = async (page: number = 1, search?: string): Promise<PeopleResponse> =>
    BaseSwapiService.fetchResources<PeopleResponse>('people', page, search)

  /**
   * Fetch a specific person by ID
   * @param id - Person ID
   * @returns Promise<Person>
   */
  static getPersonById = async (id: number): Promise<Person> => BaseSwapiService.fetchResourceById<Person>('people', id)
}
