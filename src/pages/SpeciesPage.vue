<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <ErrorBanner :error="speciesStore.currentError" @retry="retryFetch" @dismiss="speciesStore.clearError" />

    <!-- Species Table -->
    <SpeciesTable
      :species="speciesStore.tableData"
      :loading="speciesStore.isCurrentlyLoading"
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
import { useSpeciesStore } from '~/stores/species.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useTable } from '~/composables/useTable'
import { createAllSpeciesColumns } from '~/config/species/columns'
import type { Species } from '~/types'

// Initialize i18n - this connects to the global i18n context
const { t } = useI18n()

// Create reactive species columns
const columns = computed(() => createAllSpeciesColumns(t))

const speciesStore = useSpeciesStore()

// Use the generic table page composable - eliminates all boilerplate!
const { filter, pagination, onRequest, onRowClick, retryFetch } = useTable<Species>({
  store: speciesStore,
  detailRouteName: ROUTE_NAMES.SPECIES_DETAIL,
  defaultSortBy: 'name',
})
</script>

<style lang="scss" scoped>
// Page-specific styles can be added here if needed
// Table styles are now handled by SpeciesTable component
</style>
