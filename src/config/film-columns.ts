/**
 * Film Table Column Configurations
 * Provides multiple predefined column sets for different use cases
 * Enables flexible and reusable FilmsTable component usage
 * Now with full i18n support using common and films translations
 */

import { useI18n } from 'vue-i18n'

// Define the column type (using Quasar's QTableColumn structure)
export interface QTableColumn {
  name: string
  required?: boolean
  label: string
  align: 'left' | 'right' | 'center'
  field: string
  sortable?: boolean
}

/**
 * Create translated film columns using i18n
 * Uses a mix of common translations (for Episode) and films-specific translations
 *
 * @deprecated This function is not reactive to language changes.
 * Column headers won't update when the language is switched because the translations
 * are evaluated once when the function is called, not reactively.
 *
 * Instead, create reactive columns directly in your component using computed():
 *
 * @example
 * ```typescript
 * const { t } = useI18n()
 * const columns = computed(() => [
 *   { name: 'title', label: t('films.fields.title'), ... },
 *   { name: 'episode_id', label: t('common.table.episode'), ... },
 *   // ... other columns
 * ])
 * ```
 */
export const createFilmColumns = (): QTableColumn[] => {
  const { t } = useI18n()

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
 * Default full column set - All available film columns
 * This is the complete set used in the original implementation
 * @deprecated Use createFilmColumns() for i18n support
 */
export const FILM_COLUMNS_DEFAULT: QTableColumn[] = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    sortable: true,
  },
  {
    name: 'episode_id',
    label: 'Episode',
    align: 'left',
    field: 'episode_id',
    sortable: true,
  },
  {
    name: 'director',
    label: 'Director',
    align: 'left',
    field: 'director',
    sortable: true,
  },
  {
    name: 'producer',
    label: 'Producer',
    align: 'left',
    field: 'producer',
    sortable: true,
  },
  {
    name: 'release_date',
    label: 'Release Date',
    align: 'left',
    field: 'release_date',
    sortable: true,
  },
]

/**
 * Basic column set - Essential film information
 * Ideal for overview pages or when space is limited
 */
export const FILM_COLUMNS_BASIC: QTableColumn[] = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    sortable: true,
  },
  {
    name: 'episode_id',
    label: 'Episode',
    align: 'left',
    field: 'episode_id',
    sortable: true,
  },
  {
    name: 'director',
    label: 'Director',
    align: 'left',
    field: 'director',
    sortable: true,
  },
]

/**
 * Compact column set - Minimal information for mobile or tight spaces
 * Perfect for mobile views or embedded tables
 */
export const FILM_COLUMNS_COMPACT: QTableColumn[] = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    sortable: true,
  },
  {
    name: 'episode_id',
    label: 'Episode',
    align: 'left',
    field: 'episode_id',
    sortable: true,
  },
]

/**
 * Detailed column set - All current columns plus ready for future additions
 * Same as default for now, but can be extended with additional columns
 */
export const FILM_COLUMNS_DETAILED: QTableColumn[] = [
  ...FILM_COLUMNS_DEFAULT,
  // Future columns can be added here:
  // {
  //   name: 'opening_crawl',
  //   label: 'Opening Crawl',
  //   align: 'left',
  //   field: 'opening_crawl',
  //   sortable: false,
  // },
  // {
  //   name: 'characters_count',
  //   label: 'Characters',
  //   align: 'left',
  //   field: 'characters_count',
  //   sortable: true,
  // },
]

/**
 * Export default for convenience - uses the full default column set
 */
export default FILM_COLUMNS_DEFAULT

/**
 * Column set registry for easy access and iteration
 * Useful for building column selection UIs or testing
 */
export const FILM_COLUMN_SETS = {
  default: FILM_COLUMNS_DEFAULT,
  basic: FILM_COLUMNS_BASIC,
  compact: FILM_COLUMNS_COMPACT,
  detailed: FILM_COLUMNS_DETAILED,
} as const

/**
 * Column set names for type safety and UI building
 */
export type FilmColumnSetName = keyof typeof FILM_COLUMN_SETS
