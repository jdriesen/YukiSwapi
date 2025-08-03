<template>
  <q-card class="overflow-hidden shadow-3">
    <q-card-section class="q-pa-none">
      <!-- Modern Dynamic Tabs -->
      <q-tabs
        v-model="tab"
        dense
        no-caps
        inline-label
        indicator-color="primary"
        active-color="primary"
        active-bg-color="primary-1"
        align="justify"
        narrow-indicator
        class="text-grey-8 bg-white rounded-borders"
        content-class="text-weight-medium">
        <q-tab
          v-for="tabConfig in availableTabs"
          :key="tabConfig.name"
          :name="tabConfig.name"
          :icon="tabConfig.icon"
          :label="tabConfig.label"
          :ripple="{ color: tabConfig.color }"
          class="q-px-lg">
          <q-badge :color="tabConfig.color" text-color="white" rounded floating :label="tabConfig.count" class="q-ml-sm" />
        </q-tab>
      </q-tabs>

      <!-- Modern Tab Panels with Smooth Transitions -->
      <q-tab-panels v-model="tab" animated transition-prev="slide-right" transition-next="slide-left" class="bg-transparent">
        <!-- People/Characters Tab Panel -->
        <q-tab-panel name="people" v-if="film.characters.length > 0" class="q-pa-lg">
          <PeopleTabPanel :resource="{ people: film.characters }" :people-columns="peopleColumns" :get-id-from-url="getIdFromUrl" />
        </q-tab-panel>

        <!-- Planets Tab Panel -->
        <q-tab-panel name="planets" v-if="film.planets.length > 0" class="q-pa-lg">
          <PlanetsTabPanel :resource="{ planets: film.planets }" :planets-columns="planetsColumns" :get-id-from-url="getIdFromUrl" />
        </q-tab-panel>

        <!-- Starships Tab Panel -->
        <q-tab-panel name="starships" v-if="film.starships.length > 0" class="q-pa-lg">
          <StarshipsTabPanel
            :resource="{ starships: film.starships }"
            :starships-columns="starshipsColumns"
            :get-id-from-url="getIdFromUrl" />
        </q-tab-panel>

        <!-- Vehicles Tab Panel -->
        <q-tab-panel name="vehicles" v-if="film.vehicles.length > 0" class="q-pa-lg">
          <VehiclesTabPanel :resource="{ vehicles: film.vehicles }" :vehicles-columns="vehiclesColumns" :get-id-from-url="getIdFromUrl" />
        </q-tab-panel>

        <!-- Species Tab Panel -->
        <q-tab-panel name="species" v-if="film.species.length > 0" class="q-pa-lg">
          <SpeciesTabPanel :resource="{ species: film.species }" :species-columns="speciesColumns" :get-id-from-url="getIdFromUrl" />
        </q-tab-panel>

        <!-- No data available panel -->
        <q-tab-panel v-if="availableTabs.length === 0" name="no-data" class="q-pa-xl">
          <div class="text-center">
            <q-icon name="info_outline" size="4rem" color="grey-5" />
            <div class="text-h6 q-mt-lg text-grey-7">No Related Information</div>
            <p class="text-body2 text-grey-6 q-mt-md q-mb-none">
              This film has no associated characters, planets, starships, vehicles, or species data available.
            </p>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { createBasicPeopleColumns } from '~/config/people/columns'
import { createBasicPlanetsColumns } from '~/config/planets/columns'
import { createBasicStarshipsColumns } from '~/config/starships/columns'
import { createBasicVehiclesColumns } from '~/config/vehicles/columns'
import { createBasicSpeciesColumns } from '~/config/species/columns'
import { getResourceIcon, getResourceColor, type ResourceType } from '~/config/resource-icons'
import type { Film } from '~/types'

/**
 * FilmTabs Component
 * Displays film-related information in a tabbed interface
 * Uses dynamic tabs based on available data and global resource configuration
 */

interface Props {
  /** The film object containing all related data arrays */
  film: Film
  /** Function to extract ID from URL (passed from parent) */
  getIdFromUrl: (url: string) => number
}

interface TabConfig {
  name: string
  resourceType: ResourceType
  icon: string
  color: string
  label: string
  count: number
}

const props = defineProps<Props>()

// Initialize i18n - this connects to the global i18n context
const { t } = useI18n()

// Create reactive basic columns for FilmTabs context
const peopleColumns = computed(() => createBasicPeopleColumns(t))
const planetsColumns = computed(() => createBasicPlanetsColumns(t))
const starshipsColumns = computed(() => createBasicStarshipsColumns(t))
const vehiclesColumns = computed(() => createBasicVehiclesColumns(t))
const speciesColumns = computed(() => createBasicSpeciesColumns(t))

// Tab state management
const tab = ref<string>('')

// Create dynamic tabs based on film data and resource configuration
const availableTabs = computed<TabConfig[]>(() => {
  const tabs: TabConfig[] = []

  // Map film properties to resource types with their data
  const filmDataMap = [
    { resourceType: 'people' as ResourceType, data: props.film.characters },
    { resourceType: 'planets' as ResourceType, data: props.film.planets },
    { resourceType: 'starships' as ResourceType, data: props.film.starships },
    { resourceType: 'vehicles' as ResourceType, data: props.film.vehicles },
    { resourceType: 'species' as ResourceType, data: props.film.species },
  ]

  // Only create tabs for data that exists
  filmDataMap.forEach(({ resourceType, data }) => {
    if (data.length > 0) {
      tabs.push({
        name: resourceType,
        resourceType,
        icon: getResourceIcon(resourceType),
        color: getResourceColor(resourceType),
        label: t(`${resourceType}.entityNamePlural`),
        count: data.length,
      })
    }
  })

  return tabs
})

// Auto-select first available tab when tabs change
watchEffect(() => {
  if (availableTabs.value.length > 0) {
    // If current tab is not available, switch to first available tab
    const currentTabExists = availableTabs.value.some((t) => t.name === tab.value)
    if (!currentTabExists) {
      const firstTab = availableTabs.value[0]
      if (firstTab) {
        tab.value = firstTab.name
      }
    }
  } else {
    // No tabs available, set to no-data
    tab.value = 'no-data'
  }
})

// All table functionality is now handled by shared components:
// - People table functionality is handled by the shared PeopleTabPanel component
// - Planets table functionality is handled by the shared PlanetsTabPanel component
// - Starships table functionality is handled by the shared StarshipsTabPanel component
// - Vehicles table functionality is handled by the shared VehiclesTabPanel component
// - Species table functionality is handled by the shared SpeciesTabPanel component
</script>

<style lang="scss" scoped>
.q-tab-panels {
  min-height: 400px;
}

// Remove default padding since we're using q-pa-lg on individual panels
.q-tab-panel {
  padding: 0;
}

// Enhance card appearance
.q-card {
  border-radius: 12px;
}

// Smooth transitions for better UX
.q-tabs {
  transition: all 0.3s ease;
}
</style>
