/**
 * Film TypeScript interfaces for SWAPI integration
 * Contains Film interface and related types
 */

import type { SwapiResource, SwapiResponse } from './base.type'

/**
 * Film interface representing a Star Wars film
 */
export interface Film extends SwapiResource {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
}

/**
 * Type alias for Film response using the generic SwapiResponse
 */
export type FilmsResponse = SwapiResponse<Film>
