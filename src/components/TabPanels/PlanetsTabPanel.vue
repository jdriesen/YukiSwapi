<template>
  <div class="q-mb-md">
    <div class="text-h6">{{ getResourceLabelPlural('planets') }}</div>
    <div class="text-subtitle2 text-grey-6">{{ getResourceCaption('planets') }}</div>
  </div>
  <PlanetsTable
    :planets="filteredPlanets"
    :loading="planetsStore.isCurrentlyLoading"
    :pagination="planetsPagination"
    :filter="planetsFilter"
    :columns="planetsColumns"
    @row-click="handlePlanetRowClick"
    @filter-change="handlePlanetsFilterChange"
    @request="handlePlanetsTableRequest" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlanetsTable } from '~/composables/usePlanetsTable'
import { getResourceLabelPlural, getResourceConfig, type ResourceType } from '~/config/resource-icons'
import type { QTableColumn } from 'quasar'

/**
 * PlanetsTabPanel Component
 * Reusable Planets tab panel for all Tab components
 * Eliminates duplication while maintaining flexibility for different column configurations
 */

interface Props {
  /** The resource object containing planets array */
  resource: { planets: string[] }
  /** Function to extract ID from URL */
  getIdFromUrl: (url: string) => number
  /** Reactive planets columns for this context */
  planetsColumns: QTableColumn[]
}

interface Emits {
  (e: 'planet-row-click', event: unknown): void
  (e: 'planets-filter-change', event: unknown): void
  (e: 'planets-request', event: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Helper function to get resource caption
const getResourceCaption = (resourceType: ResourceType): string => {
  return getResourceConfig(resourceType).caption
}

// Convert resource to reactive reference for composables
const resourceRef = computed(() => props.resource)

// Use planets table composable for planets-related functionality
const {
  planetsFilter,
  planetsPagination,
  filteredPlanets,
  handlePlanetRowClick: internalHandlePlanetRowClick,
  handlePlanetsFilterChange: internalHandlePlanetsFilterChange,
  handlePlanetsTableRequest: internalHandlePlanetsTableRequest,
  planetsStore,
} = usePlanetsTable({
  resourceRef: resourceRef,
  getIdFromUrl: props.getIdFromUrl,
})

// Event handlers that forward to parent component
const handlePlanetRowClick = (event: unknown) => {
  internalHandlePlanetRowClick(event as never)
  emit('planet-row-click', event)
}

const handlePlanetsFilterChange = (event: unknown) => {
  internalHandlePlanetsFilterChange(event as never)
  emit('planets-filter-change', event)
}

const handlePlanetsTableRequest = (event: unknown) => {
  internalHandlePlanetsTableRequest(event as never)
  emit('planets-request', event)
}
</script>

<style lang="scss" scoped>
.q-tab-panel {
  padding: 16px 0;
}
</style>
