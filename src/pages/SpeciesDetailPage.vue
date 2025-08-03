<template>
  <q-page class="q-ma-md">
    <!-- Back Button -->
    <DetailBackBtn resource-name="Species" @back="goBack" />

    <!-- Loading State -->
    <DetailLoadingSpinner v-if="speciesStore.isItemLoading" :loading="true" resource-type="species" />

    <!-- Error State -->
    <DetailErrorBanner v-else-if="speciesStore.currentError" :error="speciesStore.currentError" @retry="retryFetch" @back="goBack" />

    <!-- Species Details -->
    <div v-else-if="species" class="q-gutter-xs">
      <!-- Main Information Card -->
      <div class="row q-gutter-md">
        <div class="col-12 col-md-6">
          <SpeciesCard :species="species" />
        </div>

        <div class="col-12 col-md-4">
          <div v-if="isPlanetLoading" class="q-pa-md text-center"></div>
          <PlanetCard v-else-if="planet" :planet="planet" />
          <q-card v-else class="q-pa-lg">
            <q-card-section class="text-center">
              <q-icon name="error" size="2em" color="grey" />
              <div class="q-mt-sm text-grey">Planet data unavailable</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Related Information Tabs -->
      <div class="q-mt-lg">
        <SpeciesTabs v-if="species" :species="species" :get-id-from-url="getIdFromUrl" />
      </div>
    </div>

    <!-- Not Found State -->
    <DetailNotFound v-else resource-type="species" resource-type-plural="species" @back="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSpeciesStore } from '~/stores/species.store'
import { usePlanetsStore } from '~/stores/planets.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useDetail } from '~/composables/useDetail'
import type { Species, Planet } from '~/types'

interface Props {
  id: string
}

const props = defineProps<Props>()
const speciesStore = useSpeciesStore()
const planetsStore = usePlanetsStore()

// Use the detail composable for common functionality
const {
  currentItem: species,
  goBack,
  retryFetch,
  getIdFromUrl,
} = useDetail<Species>(props, {
  store: speciesStore,
  listRouteName: ROUTE_NAMES.SPECIES,
  resourceName: 'species',
})
// Planet data management
const planet = ref<Planet | null>(null)
const isPlanetLoading = ref(false)

// Watch for person changes and fetch planet data
watch(
  () => species.value?.homeworld,
  async (homeworldUrl) => {
    if (homeworldUrl && species.value) {
      isPlanetLoading.value = true
      try {
        const planetId = getIdFromUrl(homeworldUrl)
        await planetsStore.fetchItemById(planetId)
        planet.value = planetsStore.currentItem
      } catch (error) {
        console.error('Failed to fetch planet:', error)
        planet.value = null
      } finally {
        isPlanetLoading.value = false
      }
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped></style>
