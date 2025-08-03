/**
 * Vehicle Table Column Configurations
 * Provides multiple predefined column sets for different use cases
 * Enables flexible and reusable VehiclesTable component usage
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
 * Default full column set - All available vehicle columns
 * This is the complete set used in the original implementation
 */
export const VEHICLE_COLUMNS_DEFAULT: QTableColumn[] = [
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
    name: 'vehicle_class',
    label: 'Vehicle Class',
    align: 'left',
    field: 'vehicle_class',
    sortable: true,
  },
  {
    name: 'max_atmosphering_speed',
    label: 'Max Speed',
    align: 'left',
    field: 'max_atmosphering_speed',
    sortable: true,
  },
  {
    name: 'crew',
    label: 'Crew',
    align: 'left',
    field: 'crew',
    sortable: true,
  },
]

/**
 * Basic column set - Essential vehicle information
 * Ideal for overview pages or when space is limited
 */
export const VEHICLE_COLUMNS_BASIC: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'vehicle_class',
    label: 'Vehicle Class',
    align: 'left',
    field: 'vehicle_class',
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
export const VEHICLE_COLUMNS_COMPACT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'vehicle_class',
    label: 'Vehicle Class',
    align: 'left',
    field: 'vehicle_class',
    sortable: true,
  },
]

/**
 * Detailed column set - All current columns plus ready for future additions
 * Same as default for now, but can be extended with additional columns
 */
export const VEHICLE_COLUMNS_DETAILED: QTableColumn[] = [
  ...VEHICLE_COLUMNS_DEFAULT,
  // Future columns can be added here:
  // {
  //   name: 'cost_in_credits',
  //   label: 'Cost',
  //   align: 'left',
  //   field: 'cost_in_credits',
  //   sortable: true,
  // },
  // {
  //   name: 'passengers',
  //   label: 'Passengers',
  //   align: 'left',
  //   field: 'passengers',
  //   sortable: true,
  // },
]

/**
 * Export default for convenience - uses the full default column set
 */
export default VEHICLE_COLUMNS_DEFAULT

/**
 * Column set registry for easy access and iteration
 * Useful for building column selection UIs or testing
 */
export const VEHICLE_COLUMN_SETS = {
  default: VEHICLE_COLUMNS_DEFAULT,
  basic: VEHICLE_COLUMNS_BASIC,
  compact: VEHICLE_COLUMNS_COMPACT,
  detailed: VEHICLE_COLUMNS_DETAILED,
} as const

/**
 * Column set names for type safety and UI building
 */
export type VehicleColumnSetName = keyof typeof VEHICLE_COLUMN_SETS
