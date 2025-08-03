<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <ErrorBanner :error="filmsStore.currentError" @retry="retryFetch" @dismiss="filmsStore.clearError" />

    <!-- Films Table -->
    <FilmsTable
      :films="filmsStore.tableData"
      :loading="filmsStore.isCurrentlyLoading"
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
import { useFilmsStore } from '~/stores/films.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useTable } from '~/composables/useTable'
import { createAllFilmColumns } from '~/config/films/columns'
import type { Film } from '~/types'

// Initialize i18n - this connects to the global i18n context
const { t } = useI18n()

// Create reactive basic film columns for PlanetTabs context
const columns = computed(() => createAllFilmColumns(t))

const filmsStore = useFilmsStore()

// Use the generic table page composable - eliminates all boilerplate!
// Note: Films use 'episode_id' as default sort instead of 'name'
const { filter, pagination, onRequest, onRowClick, retryFetch } = useTable<Film>({
  store: filmsStore,
  detailRouteName: ROUTE_NAMES.FILMS_DETAIL,
  defaultSortBy: 'episode_id',
})
</script>

<style lang="scss" scoped>
// Page-specific styles can be added here if needed
// Table styles are now handled by FilmsTable component
</style>
