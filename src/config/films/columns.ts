/**
 * Film Column Factory Functions
 * Provides reusable column definitions that maintain proper i18n reactivity
 * These functions must be called within components with their own useI18n() context
 */

import type { QTableColumn } from '~/config/film-columns'

/**
 * Create complete film columns set for main tables
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of complete film table columns
 */
export function createAllFilmColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'title',
      required: true,
      label: t('films.fields.title'),
      align: 'left',
      field: 'title',
      sortable: true,
    },
    {
      name: 'episode_id',
      label: t('common.table.episode'),
      align: 'left',
      field: 'episode_id',
      sortable: true,
    },
    {
      name: 'director',
      label: t('films.fields.director'),
      align: 'left',
      field: 'director',
      sortable: true,
    },
    {
      name: 'producer',
      label: t('films.fields.producer'),
      align: 'left',
      field: 'producer',
      sortable: true,
    },
    {
      name: 'release_date',
      label: t('films.fields.release_date'),
      align: 'left',
      field: 'release_date',
      sortable: true,
    },
  ]
}

/**
 * Create basic film columns set for detail/tab views
 * Must be called within a component that has useI18n() context
 *
 * @param t - Translation function from useI18n()
 * @returns Array of basic film table columns
 */
export function createBasicFilmColumns(t: (key: string) => string): QTableColumn[] {
  return [
    {
      name: 'title',
      required: true,
      label: t('films.fields.title'),
      align: 'left',
      field: 'title',
      sortable: true,
    },
    {
      name: 'episode_id',
      label: t('common.table.episode'),
      align: 'left',
      field: 'episode_id',
      sortable: true,
    },
    {
      name: 'director',
      label: t('films.fields.director'),
      align: 'left',
      field: 'director',
      sortable: true,
    },
  ]
}
