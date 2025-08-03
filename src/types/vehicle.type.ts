/**
 * Vehicle TypeScript interfaces for SWAPI integration
 * Contains Vehicle interface and related types
 */

import type { SwapiResource, SwapiResponse } from './base.type'

/**
 * Vehicle interface representing a Star Wars vehicle
 */
export interface Vehicle extends SwapiResource {
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
  vehicle_class: string
  pilots: string[]
  films: string[]
}

/**
 * Type alias for Vehicle response using the generic SwapiResponse
 */
export type VehiclesResponse = SwapiResponse<Vehicle>
