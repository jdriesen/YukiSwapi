<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <ErrorBanner :error="planetsStore.currentError" @retry="retryFetch" @dismiss="planetsStore.clearError" />

    <!-- Planets Table -->
    <PlanetsTable
      :planets="planetsStore.tableData"
      :loading="planetsStore.isCurrentlyLoading"
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
import { usePlanetsStore } from '~/stores/planets.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useTable } from '~/composables/useTable'
import { createAllPlanetsColumns } from '~/config/planets/columns'
import type { Planet } from '~/types'

// Initialize i18n - this connects to the global i18n context
const { t } = useI18n()

// Create reactive planets columns
const columns = computed(() => createAllPlanetsColumns(t))

const planetsStore = usePlanetsStore()

// Use the generic table page composable - eliminates all boilerplate!
const { filter, pagination, onRequest, onRowClick, retryFetch } = useTable<Planet>({
  store: planetsStore,
  detailRouteName: ROUTE_NAMES.PLANETS_DETAIL,
  defaultSortBy: 'name',
})
</script>

<style lang="scss" scoped>
// Page-specific styles can be added here if needed
// Table styles are now handled by PlanetsTable component
</style>
