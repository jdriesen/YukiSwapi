/**
 * Vehicles Column Factory Functions
 * Provides reusable column definitions that maintain proper i18n reactivity
 * These functions must be called within components with their own useI18n() context
 */

import type { QTableColumn } from '~/config/vehicle-columns'

/**
 * Create complete vehicles columns set for main tables
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of complete vehicles table columns
 */
export function createAllVehiclesColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('vehicles.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'model',
      label: t('vehicles.fields.model'),
      align: 'left',
      field: 'model',
      sortable: true,
    },
    {
      name: 'manufacturer',
      label: t('vehicles.fields.manufacturer'),
      align: 'left',
      field: 'manufacturer',
      sortable: true,
    },
    {
      name: 'vehicle_class',
      label: t('vehicles.fields.vehicle_class'),
      align: 'left',
      field: 'vehicle_class',
      sortable: true,
    },
    {
      name: 'max_atmosphering_speed',
      label: t('vehicles.fields.max_atmosphering_speed'),
      align: 'left',
      field: 'max_atmosphering_speed',
      sortable: true,
    },
    {
      name: 'crew',
      label: t('vehicles.fields.crew'),
      align: 'left',
      field: 'crew',
      sortable: true,
    },
  ]
}

/**
 * Create basic vehicles columns set for detail/tab views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of basic vehicles table columns
 */
export function createBasicVehiclesColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('vehicles.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'vehicle_class',
      label: t('vehicles.fields.vehicle_class'),
      align: 'left',
      field: 'vehicle_class',
      sortable: true,
    },
    {
      name: 'manufacturer',
      label: t('vehicles.fields.manufacturer'),
      align: 'left',
      field: 'manufacturer',
      sortable: true,
    },
  ]
}

/**
 * Create compact vehicles columns set for mobile/tight spaces
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of compact vehicles table columns
 */
export function createCompactVehiclesColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('vehicles.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'vehicle_class',
      label: t('vehicles.fields.vehicle_class'),
      align: 'left',
      field: 'vehicle_class',
      sortable: true,
    },
  ]
}

/**
 * Create detailed vehicles columns set for comprehensive views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of detailed vehicles table columns
 */
export function createDetailedVehiclesColumns(t: (key: string) => string): QTableColumn[] {
  // For now, same as all columns - can be extended with additional fields like:
  // cost_in_credits, passengers, length, cargo_capacity, consumables, etc.
  return createAllVehiclesColumns(t)
}
