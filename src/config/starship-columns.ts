/**
 * Starship Table Column Configurations
 * Provides multiple predefined column sets for different use cases
 * Enables flexible and reusable StarshipTable component usage
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
 * Default full column set - All available starship columns
 * This is the complete set used in the original implementation
 */
export const STARSHIP_COLUMNS_DEFAULT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'model',
    label: 'Model',
    align: 'left',
    field: 'model',
    sortable: true,
  },
  {
    name: 'manufacturer',
    label: 'Manufacturer',
    align: 'left',
    field: 'manufacturer',
    sortable: true,
  },
  {
    name: 'starship_class',
    label: 'Starship Class',
    align: 'left',
    field: 'starship_class',
    sortable: true,
  },
  {
    name: 'hyperdrive_rating',
    label: 'Hyperdrive Rating',
    align: 'left',
    field: 'hyperdrive_rating',
    sortable: true,
  },
  {
    name: 'MGLT',
    label: 'MGLT',
    align: 'left',
    field: 'MGLT',
    sortable: true,
  },
]

/**
 * Basic column set - Essential starship information
 * Ideal for overview pages or when space is limited
 */
export const STARSHIP_COLUMNS_BASIC: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'starship_class',
    label: 'Starship Class',
    align: 'left',
    field: 'starship_class',
    sortable: true,
  },
  {
    name: 'manufacturer',
    label: 'Manufacturer',
    align: 'left',
    field: 'manufacturer',
    sortable: true,
  },
]

/**
 * Compact column set - Minimal information for mobile or tight spaces
 * Perfect for mobile views or embedded tables
 */
export const STARSHIP_COLUMNS_COMPACT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'starship_class',
    label: 'Class',
    align: 'left',
    field: 'starship_class',
    sortable: true,
  },
]

/**
 * Detailed column set - All current columns plus ready for future additions
 * Same as default for now, but can be extended with additional columns
 */
export const STARSHIP_COLUMNS_DETAILED: QTableColumn[] = [
  ...STARSHIP_COLUMNS_DEFAULT,
  // Future columns can be added here:
  // {
  //   name: 'length',
  //   label: 'Length',
  //   align: 'left',
  //   field: 'length',
  //   sortable: true,
  // },
  // {
  //   name: 'crew',
  //   label: 'Crew',
  //   align: 'left',
  //   field: 'crew',
  //   sortable: true,
  // },
]

/**
 * Export default for convenience - uses the full default column set
 */
export default STARSHIP_COLUMNS_DEFAULT

/**
 * Column set registry for easy access and iteration
 * Useful for building column selection UIs or testing
 */
export const STARSHIP_COLUMN_SETS = {
  default: STARSHIP_COLUMNS_DEFAULT,
  basic: STARSHIP_COLUMNS_BASIC,
  compact: STARSHIP_COLUMNS_COMPACT,
  detailed: STARSHIP_COLUMNS_DETAILED,
} as const

/**
 * Column set names for type safety and UI building
 */
export type StarshipColumnSetName = keyof typeof STARSHIP_COLUMN_SETS
