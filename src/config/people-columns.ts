/**
 * People Table Column Configurations
 * Provides multiple predefined column sets for different use cases
 * Enables flexible and reusable PeopleTable component usage
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
 * Default full column set - All available people columns
 * This is the complete set used in the original implementation
 */
export const PEOPLE_COLUMNS_DEFAULT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'birth_year',
    label: 'Birth Year',
    align: 'left',
    field: 'birth_year',
    sortable: true,
  },
  {
    name: 'gender',
    label: 'Gender',
    align: 'left',
    field: 'gender',
    sortable: true,
  },
  {
    name: 'height',
    label: 'Height',
    align: 'left',
    field: 'height',
    sortable: true,
  },
  {
    name: 'mass',
    label: 'Mass',
    align: 'left',
    field: 'mass',
    sortable: true,
  },
  {
    name: 'homeworld',
    label: 'Homeworld',
    align: 'left',
    field: 'homeworld',
    sortable: false,
  },
]

/**
 * Basic column set - Essential people information
 * Ideal for overview pages or when space is limited
 */
export const PEOPLE_COLUMNS_BASIC: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'gender',
    label: 'Gender',
    align: 'left',
    field: 'gender',
    sortable: true,
  },
  {
    name: 'birth_year',
    label: 'Birth Year',
    align: 'left',
    field: 'birth_year',
    sortable: true,
  },
]

/**
 * Compact column set - Minimal information for mobile or tight spaces
 * Perfect for mobile views or embedded tables
 */
export const PEOPLE_COLUMNS_COMPACT: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'gender',
    label: 'Gender',
    align: 'left',
    field: 'gender',
    sortable: true,
  },
]

/**
 * Detailed column set - All current columns plus ready for future additions
 * Same as default for now, but can be extended with additional columns
 */
export const PEOPLE_COLUMNS_DETAILED: QTableColumn[] = [
  ...PEOPLE_COLUMNS_DEFAULT,
  // Future columns can be added here:
  // {
  //   name: 'eye_color',
  //   label: 'Eye Color',
  //   align: 'left',
  //   field: 'eye_color',
  //   sortable: true,
  // },
  // {
  //   name: 'hair_color',
  //   label: 'Hair Color',
  //   align: 'left',
  //   field: 'hair_color',
  //   sortable: true,
  // },
]

/**
 * Export default for convenience - uses the full default column set
 */
export default PEOPLE_COLUMNS_DEFAULT

/**
 * Column set registry for easy access and iteration
 * Useful for building column selection UIs or testing
 */
export const PEOPLE_COLUMN_SETS = {
  default: PEOPLE_COLUMNS_DEFAULT,
  basic: PEOPLE_COLUMNS_BASIC,
  compact: PEOPLE_COLUMNS_COMPACT,
  detailed: PEOPLE_COLUMNS_DETAILED,
} as const

/**
 * Column set names for type safety and UI building
 */
export type PeopleColumnSetName = keyof typeof PEOPLE_COLUMN_SETS
