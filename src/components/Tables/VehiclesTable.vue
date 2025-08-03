<template>
  <q-table
    v-model:pagination="internalPagination"
    :rows="vehicles"
    :columns="columns"
    :loading="loading"
    :filter="internalFilter"
    row-key="name"
    binary-state-sort
    dense
    class="q-pa-sm"
    @request="handleRequest"
    @row-click="handleRowClick">
    <!-- Title -->
    <template v-slot:top-left>
      <div class="q-pa-md full-width">
        <div class="row items-center q-gutter-sm">
          <q-icon :name="config.icon" size="2rem" :color="config.color" class="q-mr-md" />
          <div>
            <div class="text-h6">{{ title }}</div>
            <div class="text-subtitle2 text-grey-7">{{ config.caption }}</div>
          </div>
        </div>
      </div>
    </template>

    <!-- Search Input -->
    <template #top-right>
      <q-input
        :model-value="internalFilter"
        borderless
        dense
        debounce="300"
        :placeholder="t('common.searchPlaceholders.vehicles')"
        @update:model-value="handleFilterChange">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <!-- Loading Slot -->
    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>

    <!-- No Data Slot -->
    <template #no-data>
      <div class="full-width row flex-center text-grey-7 q-gutter-sm">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span>{{ t('common.table.noDataFound') }}</span>
      </div>
    </template>

    <!-- Custom Body Cell for Vehicle Class -->
    <template #body-cell-vehicle_class="props">
      <q-td :props="props">
        <q-chip color="red" text-color="white" :label="props.value" size="sm" />
      </q-td>
    </template>

    <!-- Custom Body Cell for Max Speed -->
    <template #body-cell-max_atmosphering_speed="props">
      <q-td :props="props">
        {{ formatSpeed(props.value) }}
      </q-td>
    </template>

    <!-- Custom Body Cell for Cost -->
    <template #body-cell-cost_in_credits="props">
      <q-td :props="props">
        {{ formatCost(props.value) }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getResourceConfig, type ResourceType } from '~/config/resource-icons'
import { createAllVehiclesColumns } from '~/config/vehicles/columns'
import type { Vehicle, TablePagination, QTableRequestProps } from '~/types'
import type { QTableColumn } from '~/config/vehicle-columns'

/**
 * VehiclesTable Component
 * Reusable table component for displaying vehicles data
 * Handles all vehicle-specific formatting and interactions
 * Uses reactive column definitions with allVehiclesColumns as default
 */

interface Props {
  /** Array of vehicles to display */
  vehicles: Vehicle[]
  /** Loading state for the table */
  loading: boolean
  /** Pagination configuration */
  pagination: TablePagination
  /** Current filter/search value */
  filter: string
  /** Table columns configuration - defaults to reactive allVehiclesColumns if not provided */
  columns?: QTableColumn[]
}

interface Emits {
  /** Emitted when table requests new data (pagination, sorting, filtering) */
  request: [props: QTableRequestProps]
  /** Emitted when a table row is clicked */
  rowClick: [vehicle: Vehicle]
  /** Emitted when filter/search value changes */
  filterChange: [filter: string]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

// Initialize i18n - this connects to the global i18n context
const { t, locale } = useI18n()

const resourceType: ResourceType = 'vehicles'

const config = computed(() => getResourceConfig(resourceType))

const title = computed(() => {
  // Access locale to ensure reactivity tracking
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  locale.value
  return t(`${resourceType}.entityNamePlural`)
})

// Default reactive columns - properly connects to global i18n context
const allVehiclesColumns = computed(() => createAllVehiclesColumns(t))

// Use provided columns or default to reactive allVehiclesColumns
const columns = computed(() => {
  return props.columns || allVehiclesColumns.value
})

// Internal reactive values that sync with props
const internalPagination = computed({
  get: () => props.pagination,
  set: () => {
    // Pagination changes are handled through the request event
    // This setter is needed for v-model but actual updates come from parent
  },
})

const internalFilter = computed(() => props.filter)

// Event handlers
const handleRequest = (requestProps: QTableRequestProps) => {
  emit('request', requestProps)
}

const handleRowClick = (evt: Event, row: Vehicle) => {
  emit('rowClick', row)
}

const handleFilterChange = (newFilter: string | number | null) => {
  emit('filterChange', String(newFilter || ''))
}

// Vehicle-specific formatting functions with i18n support
const formatSpeed = (speed: string): string => {
  if (speed === 'n/a' || speed === 'unknown') return t('vehicles.units.unknown')
  return t('vehicles.units.speedFormat', { value: speed })
}

const formatCost = (cost: string): string => {
  if (cost === 'n/a' || cost === 'unknown') return t('vehicles.units.unknown')
  const numCost = parseInt(cost, 10)
  if (isNaN(numCost)) return cost
  return t('vehicles.units.creditsFormat', { value: numCost.toLocaleString() })
}
</script>

<style lang="scss" scoped>
.q-table {
  .q-table__top {
    padding: 12px 16px;
  }

  :deep(.q-table tbody td) {
    cursor: pointer;
  }

  :deep(.q-table tbody tr:hover) {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
