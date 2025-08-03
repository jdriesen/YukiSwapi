/**
 * Starships Column Factory Functions
 * Provides reusable column definitions that maintain proper i18n reactivity
 * These functions must be called within components with their own useI18n() context
 */

import type { QTableColumn } from '~/config/starship-columns'

/**
 * Create complete starships columns set for main tables
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of complete starships table columns
 */
export function createAllStarshipsColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('starships.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'model',
      label: t('starships.fields.model'),
      align: 'left',
      field: 'model',
      sortable: true,
    },
    {
      name: 'manufacturer',
      label: t('starships.fields.manufacturer'),
      align: 'left',
      field: 'manufacturer',
      sortable: true,
    },
    {
      name: 'starship_class',
      label: t('starships.fields.starship_class'),
      align: 'left',
      field: 'starship_class',
      sortable: true,
    },
    {
      name: 'hyperdrive_rating',
      label: t('starships.fields.hyperdrive_rating'),
      align: 'left',
      field: 'hyperdrive_rating',
      sortable: true,
    },
    {
      name: 'MGLT',
      label: t('starships.fields.MGLT'),
      align: 'left',
      field: 'MGLT',
      sortable: true,
    },
  ]
}

/**
 * Create basic starships columns set for detail/tab views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of basic starships table columns
 */
export function createBasicStarshipsColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('starships.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'starship_class',
      label: t('starships.fields.starship_class'),
      align: 'left',
      field: 'starship_class',
      sortable: true,
    },
    {
      name: 'manufacturer',
      label: t('starships.fields.manufacturer'),
      align: 'left',
      field: 'manufacturer',
      sortable: true,
    },
  ]
}

/**
 * Create compact starships columns set for mobile/tight spaces
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of compact starships table columns
 */
export function createCompactStarshipsColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('starships.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'starship_class',
      label: t('starships.fields.starship_class'),
      align: 'left',
      field: 'starship_class',
      sortable: true,
    },
  ]
}

/**
 * Create detailed starships columns set for comprehensive views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of detailed starships table columns
 */
export function createDetailedStarshipsColumns(t: (key: string) => string): QTableColumn[] {
  // For now, same as all columns - can be extended with additional fields like:
  // length, crew, passengers, cargo_capacity, cost_in_credits, etc.
  return createAllStarshipsColumns(t)
}
