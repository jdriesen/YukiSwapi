<template>
  <PeopleTable
    :people="filteredPeople"
    :loading="peopleStore.isCurrentlyLoading"
    :pagination="peoplePagination"
    :filter="peopleFilter"
    :columns="peopleColumns"
    @row-click="handlePersonRowClick"
    @filter-change="handlePeopleFilterChange"
    @request="handlePeopleTableRequest" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePeopleTable } from '~/composables/usePeopleTable'
import type { QTableColumn } from 'quasar'

/**
 * PeopleTabPanel Component
 * Reusable People tab panel for all Tab components
 * Eliminates duplication while maintaining flexibility for different column configurations
 */

interface Props {
  /** The resource object containing people array */
  resource: { people: string[] }
  /** Function to extract ID from URL */
  getIdFromUrl: (url: string) => number
  /** Reactive people columns for this context */
  peopleColumns: QTableColumn[]
}

interface Emits {
  (e: 'person-row-click', event: unknown): void
  (e: 'people-filter-change', event: unknown): void
  (e: 'people-request', event: unknown): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Convert resource to reactive reference for composables
const resourceRef = computed(() => props.resource)

// Use people table composable for people-related functionality
const {
  peopleFilter,
  peoplePagination,
  filteredPeople,
  handlePersonRowClick: internalHandlePersonRowClick,
  handlePeopleFilterChange: internalHandlePeopleFilterChange,
  handlePeopleTableRequest: internalHandlePeopleTableRequest,
  peopleStore,
} = usePeopleTable({
  resourceRef: resourceRef,
  getIdFromUrl: props.getIdFromUrl,
})

// Event handlers that forward to parent component
const handlePersonRowClick = (event: unknown) => {
  internalHandlePersonRowClick(event as never)
  emit('person-row-click', event)
}

const handlePeopleFilterChange = (event: unknown) => {
  internalHandlePeopleFilterChange(event as never)
  emit('people-filter-change', event)
}

const handlePeopleTableRequest = (event: unknown) => {
  internalHandlePeopleTableRequest(event as never)
  emit('people-request', event)
}
</script>

<style lang="scss" scoped>
.q-tab-panel {
  padding: 16px 0;
}
</style>
