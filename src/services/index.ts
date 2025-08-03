// Individual service exports
export { PeopleService } from './people.service'
export { FilmsService } from './films.service'
export { PlanetsService } from './planets.service'
export { SpeciesService } from './species.service'
export { VehiclesService } from './vehicles.service'
export { StarshipsService } from './starships.service'

// Base service and utilities
export { BaseSwapiService } from './base-swapi.service'

/**
 * Utility class for common SWAPI operations
 * Contains shared methods that don't belong to a specific resource type
 */
export class SwapiUtils {
  /**
   * Extract ID from SWAPI URL
   * @param url - SWAPI resource URL
   * @returns Resource ID as number
   */
  static extractIdFromUrl = (url: string): number => {
    const matches = url.match(/\/(\d+)\/$/)
    return matches && matches[1] ? parseInt(matches[1], 10) : 0
  }
}
