/**
 * Table TypeScript interfaces for SWAPI integration
 * Contains table-related interfaces for Quasar q-table components
 */

/**
 * Table pagination interface for q-table
 */
export interface TablePagination {
  sortBy: string
  descending: boolean
  page: number
  rowsPerPage: number
  rowsNumber?: number
}

/**
 * Quasar q-table request event interface
 */
export interface QTableRequestProps {
  pagination: {
    sortBy: string
    descending: boolean
    page: number
    rowsPerPage: number
    rowsNumber?: number
  }
  filter?: string
  getCellValue?: (col: unknown, row: unknown) => unknown
}
