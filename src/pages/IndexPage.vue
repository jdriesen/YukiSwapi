<template>
  <q-page class="flex flex-center">
    <div class="q-pa-xl">
      <div class="text-center q-mb-xl">
        <h1 class="text-h2 text-weight-bold q-mb-md">{{ welcomeText }}</h1>
        <p class="text-h6 text-grey-7">Explore the Star Wars Universe</p>
      </div>

      <div class="row q-gutter-lg justify-center">
        <q-card
          v-for="category in categories"
          :key="category.title"
          class="category-card cursor-pointer"
          clickable
          @click="$router.push(category.route)">
          <q-card-section class="text-center q-pa-lg">
            <q-icon :name="category.icon" size="4rem" :color="category.color" />
            <div class="text-h6 q-mt-md">{{ category.title }}</div>
            <div class="text-caption text-grey-6 q-mt-sm">{{ category.description }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { ROUTE_NAMES } from '~/router/routes'
import { getAllResourceTypes, getResourceConfig } from '~/config/resource-icons'

interface Category {
  title: string
  description: string
  icon: string
  color: string
  route: { name: string }
}

// Use i18n composable to make categories reactive to language changes
const { t, locale } = useI18n()

// Resource type to route name mapping
const RESOURCE_TO_ROUTE_MAP: Record<string, string> = {
  people: 'PEOPLE',
  planets: 'PLANETS',
  films: 'FILMS',
  species: 'SPECIES',
  vehicles: 'VEHICLES',
  starships: 'STARSHIPS',
}

// Generate categories reactively - will update when language changes
const categories = computed<Category[]>(() => {
  // Access locale to ensure reactivity tracking
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  locale.value

  return getAllResourceTypes().map((type) => {
    const config = getResourceConfig(type)
    const routeKey = RESOURCE_TO_ROUTE_MAP[type]
    const routeName = ROUTE_NAMES[routeKey as keyof typeof ROUTE_NAMES]

    if (!routeName) {
      throw new Error(`Route name not found for resource type: ${type} (route key: ${routeKey})`)
    }

    return {
      title: t(`${type}.entityNamePlural`),
      description: config.description,
      icon: config.icon,
      color: config.color,
      route: { name: routeName },
    }
  })
})

// Generate reactive welcome text - will update when language changes
const welcomeText = computed(() => t('common.welcome', { appname: 'YukiSwapi' }))
</script>

<style lang="scss" scoped>
.category-card {
  width: 200px;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}
</style>
