/**
 * People Column Factory Functions
 * Provides reusable column definitions that maintain proper i18n reactivity
 * These functions must be called within components with their own useI18n() context
 */

import type { QTableColumn } from '~/config/people-columns'

/**
 * Create complete people columns set for main tables
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of complete people table columns
 */
export function createAllPeopleColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('people.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'birth_year',
      label: t('people.fields.birth_year'),
      align: 'left',
      field: 'birth_year',
      sortable: true,
    },
    {
      name: 'gender',
      label: t('people.fields.gender'),
      align: 'left',
      field: 'gender',
      sortable: true,
    },
    {
      name: 'hair_color',
      label: t('people.fields.hair_color'),
      align: 'left',
      field: 'hair_color',
      sortable: true,
    },
    {
      name: 'eye_color',
      label: t('people.fields.eye_color'),
      align: 'left',
      field: 'eye_color',
      sortable: true,
    },
    {
      name: 'height',
      label: t('people.fields.height'),
      align: 'left',
      field: 'height',
      sortable: true,
    },
    {
      name: 'mass',
      label: t('people.fields.mass'),
      align: 'left',
      field: 'mass',
      sortable: true,
    },
    {
      name: 'homeworld',
      label: t('people.fields.homeworld'),
      align: 'left',
      field: 'homeworld',
      sortable: false,
    },
  ]
}

/**
 * Create basic people columns set for detail/tab views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of basic people table columns
 */
export function createBasicPeopleColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('people.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'gender',
      label: t('people.fields.gender'),
      align: 'left',
      field: 'gender',
      sortable: true,
    },
    {
      name: 'birth_year',
      label: t('people.fields.birth_year'),
      align: 'left',
      field: 'birth_year',
      sortable: true,
    },
  ]
}

/**
 * Create compact people columns set for mobile/tight spaces
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of compact people table columns
 */
export function createCompactPeopleColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'name',
      required: true,
      label: t('people.fields.name'),
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'gender',
      label: t('people.fields.gender'),
      align: 'left',
      field: 'gender',
      sortable: true,
    },
  ]
}

/**
 * Create detailed people columns set for comprehensive views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of detailed people table columns
 */
export function createDetailedPeopleColumns(t: (key: string) => string): QTableColumn[] {
  // For now, same as all columns - can be extended with additional fields like:
  // eye_color, hair_color, skin_color, etc.
  return createAllPeopleColumns(t)
}
