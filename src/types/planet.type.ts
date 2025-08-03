/**
 * Planet TypeScript interfaces for SWAPI integration
 * Contains Planet interface and related types
 */

import type { SwapiResource, SwapiResponse } from './base.type'

/**
 * Planet interface representing a Star Wars planet
 */
export interface Planet extends SwapiResource {
  name: string
  diameter: string
  rotation_period: string
  orbital_period: string
  gravity: string
  population: string
  climate: string
  terrain: string
  surface_water: string
  residents: string[]
  films: string[]
}

/**
 * Type alias for Planet response using the generic SwapiResponse
 */
export type PlanetsResponse = SwapiResponse<Planet>
