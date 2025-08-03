/**
 * Person TypeScript interfaces for SWAPI integration
 * Contains Person interface and related types
 */

import type { SwapiResource, SwapiResponse } from './base.type'

/**
 * Person interface representing a Star Wars character
 * @example
 * const luke: Person = {
 *   name: "Luke Skywalker",
 *   birth_year: "19BBY",
 *   // ... other properties
 * }
 */
export interface Person extends SwapiResource {
  name: string
  birth_year: string
  eye_color: string
  gender: string
  hair_color: string
  height: string
  mass: string
  skin_color: string
  homeworld: string
  films: string[]
  species: string[]
  starships: string[]
  vehicles: string[]
}

/**
 * Type alias for Person response using the generic SwapiResponse
 */
export type PeopleResponse = SwapiResponse<Person>
