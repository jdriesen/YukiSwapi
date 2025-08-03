<template>
  <q-page class="q-pa-sm">
    <!-- Back Button -->
    <DetailBackBtn resource-name="Vehicles" @back="goBack" />

    <!-- Loading State -->
    <DetailLoadingSpinner v-if="vehiclesStore.isItemLoading" :loading="true" resource-type="vehicle" />

    <!-- Error State -->
    <DetailErrorBanner v-else-if="vehiclesStore.currentError" :error="vehiclesStore.currentError" @retry="retryFetch" @back="goBack" />

    <!-- Vehicle Details -->
    <div v-else-if="vehicle" class="q-gutter-lg">
      <!-- Main Information Card -->
      <div class="row">
        <div class="col-12 col-md-4">
          <VehicleCard :vehicle="vehicle" />
        </div>
      </div>

      <!-- Related Information Tabs -->
      <div class="col-12 q-pt-md">
        <VehicleTabs v-if="vehicle" :vehicle="vehicle" :get-id-from-url="getIdFromUrl" />
      </div>
    </div>

    <!-- Not Found State -->
    <DetailNotFound v-else resource-type="vehicle" resource-type-plural="vehicles" @back="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { useVehiclesStore } from '~/stores/vehicles.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useDetail } from '~/composables/useDetail'
import type { Vehicle } from '~/types'

interface Props {
  id: string
}

const props = defineProps<Props>()
const vehiclesStore = useVehiclesStore()

// Use the detail composable for common functionality
const {
  currentItem: vehicle,
  goBack,
  retryFetch,
  getIdFromUrl,
} = useDetail<Vehicle>(props, {
  store: vehiclesStore,
  listRouteName: ROUTE_NAMES.VEHICLES,
  resourceName: 'vehicle',
})
</script>

<style lang="scss" scoped></style>
