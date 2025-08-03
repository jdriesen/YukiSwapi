<template>
  <FilmsTable
    :films="filteredFilms"
    :loading="filmsStore.isCurrentlyLoading"
    :pagination="filmsPagination"
    :filter="filmsFilter"
    :columns="filmColumns"
    @row-click="handleFilmRowClick"
    @filter-change="handleFilmsFilterChange"
    @request="handleFilmsTableRequest" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFilmsTable } from '~/composables/useFilmsTable'
import type { QTableColumn } from 'quasar'

/**
 * FilmsTabPanel Component
 * Reusable Films tab panel for all Tab components
 * Eliminates duplication while maintaining flexibility for different column configurations
 */

interface Props {
  /** The resource object containing films array */
  resource: { films: string[] }
  /** Function to extract ID from URL */
  getIdFromUrl: (url: string) => number
  /** Reactive film columns for this context */
  filmColumns: QTableColumn[]
}

interface Emits {
  (e: 'film-row-click', event: unknown): void
  (e: 'film-filter-change', event: unknown): void
  (e: 'film-request', event: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Convert resource to reactive reference for composables
const resourceRef = computed(() => props.resource)

// Use films table composable for films-related functionality
const {
  filmFilter: filmsFilter,
  filmPagination: filmsPagination,
  filteredFilms,
  handleFilmRowClick: internalHandleFilmRowClick,
  handleFilterChange: internalHandleFilmsFilterChange,
  handleTableRequest: internalHandleFilmsTableRequest,
  filmsStore,
} = useFilmsTable({
  resourceRef: resourceRef,
  getIdFromUrl: props.getIdFromUrl,
})

// Event handlers that forward to parent component
const handleFilmRowClick = (event: unknown) => {
  internalHandleFilmRowClick(event as never)
  emit('film-row-click', event)
}

const handleFilmsFilterChange = (event: unknown) => {
  internalHandleFilmsFilterChange(event as never)
  emit('film-filter-change', event)
}

const handleFilmsTableRequest = (event: unknown) => {
  internalHandleFilmsTableRequest(event as never)
  emit('film-request', event)
}
</script>

<style lang="scss" scoped>
.q-tab-panel {
  padding: 16px 0;
}
</style>
