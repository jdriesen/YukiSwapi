<template>
  <q-page class="q-pa-lg">
    <!-- Error Banner -->
    <ErrorBanner :error="peopleStore.currentError" @retry="retryFetch" @dismiss="peopleStore.clearError" />

    <!-- People Table -->
    <PeopleTable
      :people="peopleStore.tableData"
      :loading="peopleStore.isCurrentlyLoading"
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
import { usePeopleStore } from '~/stores/people.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useTable } from '~/composables/useTable'
import { createAllPeopleColumns } from '~/config/people/columns'
import type { Person } from '~/types'

// Initialize i18n - this connects to the global i18n context
const { t } = useI18n()

// Create reactive people columns
const columns = computed(() => createAllPeopleColumns(t))

const peopleStore = usePeopleStore()

// Use the generic table page composable - eliminates all boilerplate!
const { filter, pagination, onRequest, onRowClick, retryFetch } = useTable<Person>({
  store: peopleStore,
  detailRouteName: ROUTE_NAMES.PEOPLE_DETAIL,
  defaultSortBy: 'name',
})
</script>

<style lang="scss" scoped>
// Page-specific styles can be added here if needed
// Table styles are now handled by PeopleTable component
</style>
