/**
 * Barrel export for all SWAPI TypeScript interfaces
 * Re-exports all types for backward compatibility and convenience
 *
 * This allows imports like:
 * import { Person, Film, SwapiResponse } from 'src/types'
 *
 * While also enabling specific imports like:
 * import { Person } from 'src/types/person.type'
 */

// Base types
export * from './base.type'

// Entity types
export * from './person.type'
export * from './planet.type'
export * from './film.type'
export * from './species.type'
export * from './vehicle.type'
export * from './starship.type'

// Utility types
export * from './table.type'
