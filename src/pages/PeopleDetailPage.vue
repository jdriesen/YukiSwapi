<template>
  <q-page class="q-ma-md">
    <!-- Back Button -->
    <DetailBackBtn resource-name="People" @back="goBack" />

    <!-- Loading State -->
    <DetailLoadingSpinner v-if="peopleStore.isItemLoading" :loading="true" resource-type="person" />

    <!-- Error State -->
    <DetailErrorBanner v-else-if="peopleStore.currentError" :error="peopleStore.currentError" @retry="retryFetch" @back="goBack" />

    <!-- Person Details -->
    <div v-else-if="person" class="q-gutter-xs">
      <!-- Main Information Cards -->
      <div class="row q-gutter-md">
        <!-- PersonCard -->
        <div class="col-12 col-md-4">
          <PersonCard :person="person" />
        </div>

        <!-- PlanetCard -->
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
      <div class="col-12 q-pt-md">
        <PersonTabs v-if="person" :person="person" :get-id-from-url="getIdFromUrl" />
      </div>
    </div>

    <!-- Not Found State -->
    <DetailNotFound v-else resource-type="person" resource-type-plural="people" @back="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePeopleStore } from '~/stores/people.store'
import { usePlanetsStore } from '~/stores/planets.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useDetail } from '~/composables/useDetail'
import type { Person, Planet } from '~/types'

interface Props {
  id: string
}

const props = defineProps<Props>()
const peopleStore = usePeopleStore()
const planetsStore = usePlanetsStore()

// Use the detail composable for common functionality
const {
  currentItem: person,
  goBack,
  retryFetch,
  getIdFromUrl,
} = useDetail<Person>(props, {
  store: peopleStore,
  listRouteName: ROUTE_NAMES.PEOPLE,
  resourceName: 'person',
})

// Planet data management
const planet = ref<Planet | null>(null)
const isPlanetLoading = ref(false)

// Watch for person changes and fetch planet data
watch(
  () => person.value?.homeworld,
  async (homeworldUrl) => {
    if (homeworldUrl && person.value) {
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
