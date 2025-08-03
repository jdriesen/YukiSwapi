<template>
  <q-page class="q-ma-md">
    <!-- Back Button -->
    <DetailBackBtn resource-name="Starships" @back="goBack" />

    <!-- Loading State -->
    <DetailLoadingSpinner v-if="starshipsStore.isItemLoading" :loading="true" resource-type="starship" />

    <!-- Error State -->
    <DetailErrorBanner v-else-if="starshipsStore.currentError" :error="starshipsStore.currentError" @retry="retryFetch" @back="goBack" />

    <!-- Starship Details -->
    <div v-else-if="starship" class="q-gutter-lg">
      <!-- Main Information Card -->
      <div class="row">
        <div class="col-12 col-md-4">
          <StarshipCard :starship="starship" />
        </div>
      </div>

      <!-- Related Information Tabs -->
      <div class="col-12 q-pt-md">
        <StarshipTabs v-if="starship" :starship="starship" :get-id-from-url="getIdFromUrl" />
      </div>
    </div>

    <!-- Not Found State -->
    <DetailNotFound v-else resource-type="starship" resource-type-plural="starships" @back="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { useStarshipsStore } from '~/stores/starships.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useDetail } from '~/composables/useDetail'
import type { Starship } from '~/types'

interface Props {
  id: string
}

const props = defineProps<Props>()
const starshipsStore = useStarshipsStore()

// Use the detail composable for common functionality
const {
  currentItem: starship,
  goBack,
  retryFetch,
  getIdFromUrl,
} = useDetail<Starship>(props, {
  store: starshipsStore,
  listRouteName: ROUTE_NAMES.STARSHIPS,
  resourceName: 'starship',
})
</script>

<style lang="scss" scoped>
.q-card {
  min-height: 400px;
}

.q-chip {
  margin: 2px;
}
</style>
