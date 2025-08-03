<template>
  <SpeciesTable
    :species="filteredSpecies"
    :loading="speciesStore.isCurrentlyLoading"
    :pagination="speciesPagination"
    :filter="speciesFilter"
    :columns="speciesColumns"
    @row-click="handleSpeciesRowClick"
    @filter-change="handleSpeciesFilterChange"
    @request="handleSpeciesTableRequest" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSpeciesTable } from '~/composables/useSpeciesTable'
import type { QTableColumn } from 'quasar'

/**
 * SpeciesTabPanel Component
 * Reusable Species tab panel for all Tab components
 * Eliminates duplication while maintaining flexibility for different column configurations
 */

interface Props {
  /** The resource object containing species array */
  resource: { species: string[] }
  /** Function to extract ID from URL */
  getIdFromUrl: (url: string) => number
  /** Reactive species columns for this context */
  speciesColumns: QTableColumn[]
}

interface Emits {
  (e: 'species-row-click', event: unknown): void
  (e: 'species-filter-change', event: unknown): void
  (e: 'species-request', event: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Convert resource to reactive reference for composables
const resourceRef = computed(() => props.resource)

// Use species table composable for species-related functionality
const {
  speciesFilter,
  speciesPagination,
  filteredSpecies,
  handleSpeciesRowClick: internalHandleSpeciesRowClick,
  handleSpeciesFilterChange: internalHandleSpeciesFilterChange,
  handleSpeciesTableRequest: internalHandleSpeciesTableRequest,
  speciesStore,
} = useSpeciesTable({
  resourceRef: resourceRef,
  getIdFromUrl: props.getIdFromUrl,
})

// Event handlers that forward to parent component
const handleSpeciesRowClick = (event: unknown) => {
  internalHandleSpeciesRowClick(event as never)
  emit('species-row-click', event)
}

const handleSpeciesFilterChange = (event: unknown) => {
  internalHandleSpeciesFilterChange(event as never)
  emit('species-filter-change', event)
}

const handleSpeciesTableRequest = (event: unknown) => {
  internalHandleSpeciesTableRequest(event as never)
  emit('species-request', event)
}
</script>

<style lang="scss" scoped>
.q-tab-panel {
  padding: 16px 0;
}
</style>
