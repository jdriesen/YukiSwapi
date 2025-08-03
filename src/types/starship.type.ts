/**
 * Starship TypeScript interfaces for SWAPI integration
 * Contains Starship interface and related types
 */

import type { SwapiResource, SwapiResponse } from './base.type'

/**
 * Starship interface representing a Star Wars starship
 */
export interface Starship extends SwapiResource {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  films: string[]
}

/**
 * Type alias for Starship response using the generic SwapiResponse
 */
export type StarshipsResponse = SwapiResponse<Starship>
