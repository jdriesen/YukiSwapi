/**
 * Species TypeScript interfaces for SWAPI integration
 * Contains Species interface and related types
 */

import type { SwapiResource, SwapiResponse } from './base.type'

/**
 * Species interface representing a Star Wars species
 */
export interface Species extends SwapiResource {
  name: string
  classification: string
  designation: string
  average_height: string
  skin_colors: string
  hair_colors: string
  eye_colors: string
  average_lifespan: string
  homeworld: string | null
  language: string
  people: string[]
  films: string[]
}

/**
 * Type alias for Species response using the generic SwapiResponse
 */
export type SpeciesResponse = SwapiResponse<Species>
