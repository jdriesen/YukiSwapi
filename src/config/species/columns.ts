/**
 * Species Column Factory Functions
 * Provides reusable column definitions that maintain proper i18n reactivity
 * These functions must be called within components with their own useI18n() context
 */

import type { QTableColumn } from '~/config/species-columns'

/**
 * Create complete species columns set for main tables
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of complete species table columns
 */
export function createAllSpeciesColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('species.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'classification',
      label: t('species.fields.classification'),
      align: 'left',
      field: 'classification',
      sortable: true,
    },
    {
      name: 'designation',
      label: t('species.fields.designation'),
      align: 'left',
      field: 'designation',
      sortable: true,
    },
    {
      name: 'average_height',
      label: t('species.fields.average_height'),
      align: 'left',
      field: 'average_height',
      sortable: true,
    },
    {
      name: 'average_lifespan',
      label: t('species.fields.average_lifespan'),
      align: 'left',
      field: 'average_lifespan',
      sortable: true,
    },
    {
      name: 'language',
      label: t('species.fields.language'),
      align: 'left',
      field: 'language',
      sortable: true,
    },
  ]
}

/**
 * Create basic species columns set for detail/tab views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of basic species table columns
 */
export function createBasicSpeciesColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('species.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'classification',
      label: t('species.fields.classification'),
      align: 'left',
      field: 'classification',
      sortable: true,
    },
    {
      name: 'language',
      label: t('species.fields.language'),
      align: 'left',
      field: 'language',
      sortable: true,
    },
  ]
}

/**
 * Create compact species columns set for mobile/tight spaces
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of compact species table columns
 */
export function createCompactSpeciesColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('species.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'classification',
      label: t('species.fields.classification'),
      align: 'left',
      field: 'classification',
      sortable: true,
    },
  ]
}

/**
 * Create detailed species columns set for comprehensive views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of detailed species table columns
 */
export function createDetailedSpeciesColumns(t: (key: string) => string): QTableColumn[] {
  // For now, same as all columns - can be extended with additional fields like:
  // skin_colors, hair_colors, eye_colors, homeworld, etc.
  return createAllSpeciesColumns(t)
}
