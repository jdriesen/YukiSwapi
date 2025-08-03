<template>
  <VehiclesTable
    :vehicles="filteredVehicles"
    :loading="vehiclesStore.isCurrentlyLoading"
    :pagination="vehiclesPagination"
    :filter="vehiclesFilter"
    :columns="vehiclesColumns"
    @row-click="handleVehicleRowClick"
    @filter-change="handleVehiclesFilterChange"
    @request="handleVehiclesTableRequest" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useVehiclesTable } from '~/composables/useVehiclesTable'
import type { QTableColumn } from 'quasar'

/**
 * VehiclesTabPanel Component
 * Reusable Vehicles tab panel for all Tab components
 * Eliminates duplication while maintaining flexibility for different column configurations
 */

interface Props {
  /** The resource object containing vehicles array */
  resource: { vehicles: string[] }
  /** Function to extract ID from URL */
  getIdFromUrl: (url: string) => number
  /** Reactive vehicles columns for this context */
  vehiclesColumns: QTableColumn[]
}

interface Emits {
  (e: 'vehicle-row-click', event: unknown): void
  (e: 'vehicles-filter-change', event: unknown): void
  (e: 'vehicles-request', event: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Convert resource to reactive reference for composables
const resourceRef = computed(() => props.resource)

// Use vehicles table composable for vehicles-related functionality
const {
  vehiclesFilter,
  vehiclesPagination,
  filteredVehicles,
  handleVehicleRowClick: internalHandleVehicleRowClick,
  handleVehiclesFilterChange: internalHandleVehiclesFilterChange,
  handleVehiclesTableRequest: internalHandleVehiclesTableRequest,
  vehiclesStore,
} = useVehiclesTable({
  resourceRef: resourceRef,
  getIdFromUrl: props.getIdFromUrl,
})

// Event handlers that forward to parent component
const handleVehicleRowClick = (event: unknown) => {
  internalHandleVehicleRowClick(event as never)
  emit('vehicle-row-click', event)
}

const handleVehiclesFilterChange = (event: unknown) => {
  internalHandleVehiclesFilterChange(event as never)
  emit('vehicles-filter-change', event)
}

const handleVehiclesTableRequest = (event: unknown) => {
  internalHandleVehiclesTableRequest(event as never)
  emit('vehicles-request', event)
}
</script>

<style lang="scss" scoped>
.q-tab-panel {
  padding: 16px 0;
}
</style>
