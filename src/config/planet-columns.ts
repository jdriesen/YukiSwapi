/**
 * Planet Table Column Configurations
 * Provides multiple predefined column sets for different use cases
 * Enables flexible and reusable PlanetsTable component usage
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
 * Default full column set - All available planet columns
 * This is the complete set used in the original implementation
 */
export const PLANET_COLUMNS_DEFAULT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'climate',
    label: 'Climate',
    align: 'left',
    field: 'climate',
    sortable: true,
  },
  {
    name: 'terrain',
    label: 'Terrain',
    align: 'left',
    field: 'terrain',
    sortable: true,
  },
  {
    name: 'population',
    label: 'Population',
    align: 'left',
    field: 'population',
    sortable: true,
  },
  {
    name: 'diameter',
    label: 'Diameter',
    align: 'left',
    field: 'diameter',
    sortable: true,
  },
  {
    name: 'gravity',
    label: 'Gravity',
    align: 'left',
    field: 'gravity',
    sortable: false,
  },
]

/**
 * Basic column set - Essential planet information
 * Ideal for overview pages or when space is limited
 */
export const PLANET_COLUMNS_BASIC: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'climate',
    label: 'Climate',
    align: 'left',
    field: 'climate',
    sortable: true,
  },
  {
    name: 'population',
    label: 'Population',
    align: 'left',
    field: 'population',
    sortable: true,
  },
]

/**
 * Compact column set - Minimal information for mobile or tight spaces
 * Perfect for mobile views or embedded tables
 */
export const PLANET_COLUMNS_COMPACT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'climate',
    label: 'Climate',
    align: 'left',
    field: 'climate',
    sortable: true,
  },
]

/**
 * Detailed column set - All current columns plus ready for future additions
 * Same as default for now, but can be extended with additional columns
 */
export const PLANET_COLUMNS_DETAILED: QTableColumn[] = [
  ...PLANET_COLUMNS_DEFAULT,
  // Future columns can be added here:
  // {
  //   name: 'orbital_period',
  //   label: 'Orbital Period',
  //   align: 'left',
  //   field: 'orbital_period',
  //   sortable: true,
  // },
  // {
  //   name: 'rotation_period',
  //   label: 'Rotation Period',
  //   align: 'left',
  //   field: 'rotation_period',
  //   sortable: true,
  // },
]

/**
 * Export default for convenience - uses the full default column set
 */
export default PLANET_COLUMNS_DEFAULT

/**
 * Column set registry for easy access and iteration
 * Useful for building column selection UIs or testing
 */
export const PLANET_COLUMN_SETS = {
  default: PLANET_COLUMNS_DEFAULT,
  basic: PLANET_COLUMNS_BASIC,
  compact: PLANET_COLUMNS_COMPACT,
  detailed: PLANET_COLUMNS_DETAILED,
} as const

/**
 * Column set names for type safety and UI building
 */
export type PlanetColumnSetName = keyof typeof PLANET_COLUMN_SETS
