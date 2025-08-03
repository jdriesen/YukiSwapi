<template>
  <q-table
    v-model:pagination="internalPagination"
    :rows="films"
    :columns="columns"
    :loading="loading"
    :filter="internalFilter"
    row-key="title"
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
        :placeholder="t('common.searchPlaceholders.films')"
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

    <!-- Custom Body Cell for Episode -->
    <template #body-cell-episode_id="props">
      <q-td :props="props">
        <q-chip color="purple" text-color="white" :label="formatEpisode(props.value)" size="sm" />
      </q-td>
    </template>

    <!-- Custom Body Cell for Release Date -->
    <template #body-cell-release_date="props">
      <q-td :props="props">
        {{ formatReleaseDate(props.value) }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getResourceConfig, type ResourceType } from '~/config/resource-icons'
import { createAllFilmColumns } from '~/config/films/columns'
import type { Film, TablePagination, QTableRequestProps } from '~/types'
import type { QTableColumn } from '~/config/film-columns'

/**
 * FilmsTable Component
 * Reusable table component for displaying films data
 * Handles all film-specific formatting and interactions
 * Uses reactive column definitions with allFilmColumns as default
 */

interface Props {
  /** Array of films to display */
  films: Film[]
  /** Loading state for the table */
  loading: boolean
  /** Pagination configuration */
  pagination: TablePagination
  /** Current filter/search value */
  filter: string
  /** Table columns configuration - defaults to reactive allFilmColumns if not provided */
  columns?: QTableColumn[]
}

interface Emits {
  /** Emitted when table requests new data (pagination, sorting, filtering) */
  request: [props: QTableRequestProps]
  /** Emitted when a table row is clicked */
  rowClick: [film: Film]
  /** Emitted when filter/search value changes */
  filterChange: [filter: string]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

// Initialize i18n - this connects to the global i18n context
const { t, locale } = useI18n()

const resourceType: ResourceType = 'films'

const config = computed(() => getResourceConfig(resourceType))

const title = computed(() => {
  // Access locale to ensure reactivity tracking
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  locale.value
  return t(`${resourceType}.entityNamePlural`)
})

// Default reactive columns - properly connects to global i18n context
const allFilmColumns = computed(() => createAllFilmColumns(t))

// Use provided columns or default to reactive allFilmColumns
const columns = computed(() => {
  return props.columns || allFilmColumns.value
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

const handleRowClick = (evt: Event, row: Film) => {
  emit('rowClick', row)
}

const handleFilterChange = (newFilter: string | number | null) => {
  emit('filterChange', String(newFilter || ''))
}

// Film-specific formatting functions with i18n support
const formatEpisode = (episodeId: number): string => {
  const romanNumerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  return t('common.table.episodeFormat', {
    number: romanNumerals[episodeId] || episodeId,
  })
}

const formatReleaseDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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
