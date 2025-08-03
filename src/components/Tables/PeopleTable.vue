<template>
  <q-table
    v-model:pagination="internalPagination"
    :rows="people"
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
        :placeholder="t('common.searchPlaceholders.people')"
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

    <!-- Custom Body Cell for Homeworld -->
    <!--
    <template #body-cell-homeworld="props">
      <q-td :props="props">
        <q-chip color="primary" text-color="white" :label="getHomeworldName()" size="sm" />
      </q-td>
    </template>
    -->

    <!-- Custom Body Cell for Height -->
    <template #body-cell-height="props">
      <q-td :props="props">
        {{ formatHeight(props.value) }}
      </q-td>
    </template>

    <!-- Custom Body Cell for Mass -->
    <template #body-cell-mass="props">
      <q-td :props="props">
        {{ formatMass(props.value) }}
      </q-td>
    </template>

    <!-- Custom Body Cell for Hair Color -->
    <template #body-cell-hair_color="props">
      <q-td :props="props">
        {{ formatHairColor(props.value) }}
      </q-td>
    </template>

    <!-- Custom Body Cell for Eye Color -->
    <template #body-cell-eye_color="props">
      <q-td :props="props">
        {{ formatEyeColor(props.value) }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getResourceConfig, type ResourceType } from '~/config/resource-icons'
import { createAllPeopleColumns } from '~/config/people/columns'
import type { Person, TablePagination, QTableRequestProps } from '~/types'
import type { QTableColumn } from '~/config/people-columns'

/**
 * PeopleTable Component
 * Reusable table component for displaying people data
 * Handles all people-specific formatting and interactions
 * Uses reactive column definitions with allPeopleColumns as default
 */

interface Props {
  /** Array of people to display */
  people: Person[]
  /** Loading state for the table */
  loading: boolean
  /** Pagination configuration */
  pagination: TablePagination
  /** Current filter/search value */
  filter: string
  /** Table columns configuration - defaults to reactive allPeopleColumns if not provided */
  columns?: QTableColumn[]
}

interface Emits {
  /** Emitted when table requests new data (pagination, sorting, filtering) */
  request: [props: QTableRequestProps]
  /** Emitted when a table row is clicked */
  rowClick: [person: Person]
  /** Emitted when filter/search value changes */
  filterChange: [filter: string]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

// Initialize i18n - this connects to the global i18n context
const { t, locale } = useI18n()

const resourceType: ResourceType = 'people'

const config = computed(() => getResourceConfig(resourceType))

const title = computed(() => {
  // Access locale to ensure reactivity tracking
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  locale.value
  return t(`${resourceType}.entityNamePlural`)
})

// Default reactive columns - properly connects to global i18n context
const allPeopleColumns = computed(() => createAllPeopleColumns(t))

// Use provided columns or default to reactive allPeopleColumns
const columns = computed(() => {
  return props.columns || allPeopleColumns.value
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

const handleRowClick = (evt: Event, row: Person) => {
  emit('rowClick', row)
}

const handleFilterChange = (newFilter: string | number | null) => {
  emit('filterChange', String(newFilter || ''))
}

// People-specific formatting functions with i18n support
/*
const getHomeworldName = (): string => {
  // For now, just show "Planet" - could be enhanced to fetch planet names
  return 'Planet'
}
  */

const formatHeight = (height: string): string => {
  if (height === 'unknown') return t('people.units.unknown')
  return t('people.units.heightFormat', { value: height })
}

const formatMass = (mass: string): string => {
  if (mass === 'unknown') return t('people.units.unknown')
  return t('people.units.massFormat', { value: mass })
}

const formatHairColor = (hairColor: string): string => {
  if (hairColor === 'unknown' || hairColor === 'n/a') {
    return t('people.units.unknown')
  }
  // Capitalize first letter of each word and handle multiple colors
  return hairColor
    .split(',')
    .map((color) =>
      color
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(', ')
}

const formatEyeColor = (eyeColor: string): string => {
  if (eyeColor === 'unknown' || eyeColor === 'n/a') {
    return t('people.units.unknown')
  }
  // Capitalize first letter of each word and handle multiple colors
  return eyeColor
    .split(',')
    .map((color) =>
      color
        .trim()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    )
    .join(', ')
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
