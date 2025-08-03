<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <ErrorBanner :error="vehiclesStore.currentError" @retry="retryFetch" @dismiss="vehiclesStore.clearError" />

    <!-- Vehicles Table -->
    <VehiclesTable
      :vehicles="vehiclesStore.tableData"
      :loading="vehiclesStore.isCurrentlyLoading"
      :pagination="pagination"
      :filter="filter"
      :columns="columns"
      @request="onRequest"
      @row-click="onRowClick"
      @filter-change="filter = $event" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVehiclesStore } from '~/stores/vehicles.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useTable } from '~/composables/useTable'
import { createAllVehiclesColumns } from '~/config/vehicles/columns'
import type { Vehicle } from '~/types'

// Initialize i18n - this connects to the global i18n context
const { t } = useI18n()

// Create reactive vehicles columns
const columns = computed(() => createAllVehiclesColumns(t))

const vehiclesStore = useVehiclesStore()

// Use the generic table page composable - eliminates all boilerplate!
const { filter, pagination, onRequest, onRowClick, retryFetch } = useTable<Vehicle>({
  store: vehiclesStore,
  detailRouteName: ROUTE_NAMES.VEHICLES_DETAIL,
  defaultSortBy: 'name',
})
</script>

<style lang="scss" scoped>
// Page-specific styles can be added here if needed
// Table styles are now handled by VehiclesTable component
</style>
