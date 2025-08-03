/**
 * Species Table Column Configurations
 * Provides multiple predefined column sets for different use cases
 * Enables flexible and reusable SpeciesTable component usage
 */

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
 * Default full column set - All available species columns
 * This is the complete set used in the original implementation
 */
export const SPECIES_COLUMNS_DEFAULT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'classification',
    label: 'Classification',
    align: 'left',
    field: 'classification',
    sortable: true,
  },
  {
    name: 'designation',
    label: 'Designation',
    align: 'left',
    field: 'designation',
    sortable: true,
  },
  {
    name: 'average_height',
    label: 'Average Height',
    align: 'left',
    field: 'average_height',
    sortable: true,
  },
  {
    name: 'average_lifespan',
    label: 'Average Lifespan',
    align: 'left',
    field: 'average_lifespan',
    sortable: true,
  },
  {
    name: 'language',
    label: 'Language',
    align: 'left',
    field: 'language',
    sortable: true,
  },
]

/**
 * Basic column set - Essential species information
 * Ideal for overview pages or when space is limited
 */
export const SPECIES_COLUMNS_BASIC: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'classification',
    label: 'Classification',
    align: 'left',
    field: 'classification',
    sortable: true,
  },
  {
    name: 'language',
    label: 'Language',
    align: 'left',
    field: 'language',
    sortable: true,
  },
]

/**
 * Compact column set - Minimal information for mobile or tight spaces
 * Perfect for mobile views or embedded tables
 */
export const SPECIES_COLUMNS_COMPACT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'classification',
    label: 'Classification',
    align: 'left',
    field: 'classification',
    sortable: true,
  },
]

/**
 * Detailed column set - All current columns plus ready for future additions
 * Same as default for now, but can be extended with additional columns
 */
export const SPECIES_COLUMNS_DETAILED: QTableColumn[] = [
  ...SPECIES_COLUMNS_DEFAULT,
  // Future columns can be added here:
  // {
  //   name: 'skin_colors',
  //   label: 'Skin Colors',
  //   align: 'left',
  //   field: 'skin_colors',
  //   sortable: true,
  // },
  // {
  //   name: 'hair_colors',
  //   label: 'Hair Colors',
  //   align: 'left',
  //   field: 'hair_colors',
  //   sortable: true,
  // },
]

/**
 * Export default for convenience - uses the full default column set
 */
export default SPECIES_COLUMNS_DEFAULT

/**
 * Column set registry for easy access and iteration
 * Useful for building column selection UIs or testing
 */
export const SPECIES_COLUMN_SETS = {
  default: SPECIES_COLUMNS_DEFAULT,
  basic: SPECIES_COLUMNS_BASIC,
  compact: SPECIES_COLUMNS_COMPACT,
  detailed: SPECIES_COLUMNS_DETAILED,
} as const

/**
 * Column set names for type safety and UI building
 */
export type SpeciesColumnSetName = keyof typeof SPECIES_COLUMN_SETS
