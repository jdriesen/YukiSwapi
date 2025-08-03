/**
 * Planets Column Factory Functions
 * Provides reusable column definitions that maintain proper i18n reactivity
 * These functions must be called within components with their own useI18n() context
 */

import type { QTableColumn } from '~/config/planet-columns'

/**
 * Create complete planets columns set for main tables
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of complete planets table columns
 */
export function createAllPlanetsColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('planets.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'climate',
      label: t('planets.fields.climate'),
      align: 'left',
      field: 'climate',
      sortable: true,
    },
    {
      name: 'terrain',
      label: t('planets.fields.terrain'),
      align: 'left',
      field: 'terrain',
      sortable: true,
    },
    {
      name: 'population',
      label: t('planets.fields.population'),
      align: 'left',
      field: 'population',
      sortable: true,
    },
    {
      name: 'diameter',
      label: t('planets.fields.diameter'),
      align: 'left',
      field: 'diameter',
      sortable: true,
    },
    {
      name: 'gravity',
      label: t('planets.fields.gravity'),
      align: 'left',
      field: 'gravity',
      sortable: false,
    },
  ]
}

/**
 * Create basic planets columns set for detail/tab views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of basic planets table columns
 */
export function createBasicPlanetsColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('planets.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'climate',
      label: t('planets.fields.climate'),
      align: 'left',
      field: 'climate',
      sortable: true,
    },
    {
      name: 'population',
      label: t('planets.fields.population'),
      align: 'left',
      field: 'population',
      sortable: true,
    },
  ]
}

/**
 * Create compact planets columns set for mobile/tight spaces
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of compact planets table columns
 */
export function createCompactPlanetsColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('planets.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'climate',
      label: t('planets.fields.climate'),
      align: 'left',
      field: 'climate',
      sortable: true,
    },
  ]
}

/**
 * Create detailed planets columns set for comprehensive views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of detailed planets table columns
 */
export function createDetailedPlanetsColumns(t: (key: string) => string): QTableColumn[] {
  // For now, same as all columns - can be extended with additional fields like:
  // orbital_period, rotation_period, surface_water, etc.
  return createAllPlanetsColumns(t)
}
