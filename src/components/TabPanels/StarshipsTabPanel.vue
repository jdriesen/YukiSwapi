<template>
  <StarshipTable
    :starships="filteredStarships"
    :loading="starshipsStore.isCurrentlyLoading"
    :pagination="starshipsPagination"
    :filter="starshipsFilter"
    :columns="starshipsColumns"
    @row-click="handleStarshipRowClick"
    @filter-change="handleStarshipsFilterChange"
    @request="handleStarshipsTableRequest" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStarshipsTable } from '~/composables/useStarshipsTable'
import type { QTableColumn } from 'quasar'

/**
 * StarshipsTabPanel Component
 * Reusable Starships tab panel for all Tab components
 * Eliminates duplication while maintaining flexibility for different column configurations
 */

interface Props {
  /** The resource object containing starships array */
  resource: { starships: string[] }
  /** Function to extract ID from URL */
  getIdFromUrl: (url: string) => number
  /** Reactive starships columns for this context */
  starshipsColumns: QTableColumn[]
}

interface Emits {
  (e: 'starship-row-click', event: unknown): void
  (e: 'starships-filter-change', event: unknown): void
  (e: 'starships-request', event: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Convert resource to reactive reference for composables
const resourceRef = computed(() => props.resource)

// Use starships table composable for starships-related functionality
const {
  starshipsFilter,
  starshipsPagination,
  filteredStarships,
  handleStarshipRowClick: internalHandleStarshipRowClick,
  handleStarshipsFilterChange: internalHandleStarshipsFilterChange,
  handleStarshipsTableRequest: internalHandleStarshipsTableRequest,
  starshipsStore,
} = useStarshipsTable({
  resourceRef: resourceRef,
  getIdFromUrl: props.getIdFromUrl,
})

// Event handlers that forward to parent component
const handleStarshipRowClick = (event: unknown) => {
  internalHandleStarshipRowClick(event as never)
  emit('starship-row-click', event)
}

const handleStarshipsFilterChange = (event: unknown) => {
  internalHandleStarshipsFilterChange(event as never)
  emit('starships-filter-change', event)
}

const handleStarshipsTableRequest = (event: unknown) => {
  internalHandleStarshipsTableRequest(event as never)
  emit('starships-request', event)
}
</script>

<style lang="scss" scoped>
.q-tab-panel {
  padding: 16px 0;
}
</style>
