<template>
  <q-page class="q-ma-md">
    <!-- Back Button -->
    <DetailBackBtn resource-name="Planets" @back="goBack" />

    <!-- Loading State -->
    <DetailLoadingSpinner v-if="planetsStore.isItemLoading" :loading="true" resource-type="planet" />

    <!-- Error State -->
    <DetailErrorBanner v-else-if="planetsStore.currentError" :error="planetsStore.currentError" @retry="retryFetch" @back="goBack" />

    <!-- Planet Details -->
    <div v-else-if="planet" class="q-gutter-xs">
      <!-- Main Information Card -->
      <div class="row q-gutter-md">
        <div class="col-12 col-md-4">
          <PlanetCard :planet="planet" />
        </div>
      </div>

      <!-- Related Information Tabs -->
      <div class="col-12 q-pt-md">
        <PlanetTabs v-if="planet" :planet="planet" :get-id-from-url="getIdFromUrl" />
      </div>
    </div>

    <!-- Not Found State -->
    <DetailNotFound v-else resource-type="planet" resource-type-plural="planets" @back="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { usePlanetsStore } from '~/stores/planets.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useDetail } from '~/composables/useDetail'
import type { Planet } from '~/types'

interface Props {
  id: string
}

const props = defineProps<Props>()
const planetsStore = usePlanetsStore()

// Use the detail composable for common functionality
const {
  currentItem: planet,
  goBack,
  retryFetch,
  getIdFromUrl,
} = useDetail<Planet>(props, {
  store: planetsStore,
  listRouteName: ROUTE_NAMES.PLANETS,
  resourceName: 'planet',
})
</script>

<style lang="scss" scoped></style>
