<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <ErrorBanner :error="starshipsStore.currentError" @retry="retryFetch" @dismiss="starshipsStore.clearError" />

    <!-- Starships Table -->
    <StarshipTable
      :starships="starshipsStore.tableData"
      :loading="starshipsStore.isCurrentlyLoading"
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
import { useStarshipsStore } from '~/stores/starships.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useTable } from '~/composables/useTable'
import { createAllStarshipsColumns } from '~/config/starships/columns'
import type { Starship } from '~/types'

// Initialize i18n - this connects to the global i18n context
const { t } = useI18n()

// Create reactive starships columns
const columns = computed(() => createAllStarshipsColumns(t))

const starshipsStore = useStarshipsStore()

// Use the generic table page composable - eliminates all boilerplate!
const { filter, pagination, onRequest, onRowClick, retryFetch } = useTable<Starship>({
  store: starshipsStore,
  detailRouteName: ROUTE_NAMES.STARSHIPS_DETAIL,
  defaultSortBy: 'name',
})
</script>

<style lang="scss" scoped>
// Page-specific styles can be added here if needed
// Table styles are now handled by StarshipTable component
</style>
