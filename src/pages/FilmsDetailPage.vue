<template>
  <q-page class="q-ma-md">
    <!-- Back Button -->
    <DetailBackBtn resource-name="Films" @back="goBack" />

    <!-- Loading State -->
    <DetailLoadingSpinner v-if="filmsStore.isItemLoading" :loading="true" resource-type="film" />

    <!-- Error State -->
    <DetailErrorBanner v-else-if="filmsStore.currentError" :error="filmsStore.currentError" @retry="retryFetch" @back="goBack" />

    <!-- Film Details -->
    <div v-else-if="film" class="row q-gutter-lg">
      <!-- Main Information Card -->
      <div class="col-12 col-md-6">
        <FilmCard :film="film" />
      </div>

      <!-- Related Information Tabs -->
      <div class="col-12 q-pt-md">
        <FilmTabs v-if="film" :film="film" :get-id-from-url="getIdFromUrl" />
      </div>
    </div>

    <!-- Not Found State -->

    <DetailNotFound v-else resource-type="film" resource-type-plural="films" @back="goBack" />
  </q-page>
</template>

<script setup lang="ts">
import { useFilmsStore } from '~/stores/films.store'
import { ROUTE_NAMES } from '~/router/routes'
import { useDetail } from '~/composables/useDetail'
import type { Film } from '~/types'

interface Props {
  id: string
}

const props = defineProps<Props>()
const filmsStore = useFilmsStore()

const {
  currentItem: film,
  goBack,
  retryFetch,
  getIdFromUrl,
} = useDetail<Film>(props, {
  store: filmsStore,
  listRouteName: ROUTE_NAMES.FILMS,
  resourceName: 'film',
})
</script>

<style lang="scss" scoped></style>
