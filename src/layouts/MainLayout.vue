<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat no-caps no-wrap class="text-h6" @click="$router.push({ name: ROUTE_NAMES.HOME })"> YukiSwapi </q-btn>

        <div>Star Wars Universe</div>

        <q-space />

        <MainHeaderLanguageSelector />
        <DarkModeToggle />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Resources </q-item-label>

        <q-item v-for="menuItem in menuItems" :key="menuItem.title" clickable :to="menuItem.route" exact>
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ menuItem.title }}</q-item-label>
            <q-item-label caption>{{ menuItem.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <MainFooter />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { ROUTE_NAMES } from '~/router/routes'
import { getAllResourceTypes, getResourceConfig } from '~/config/resource-icons'

interface MenuItem {
  title: string
  caption: string
  icon: string
  route: { name: string }
}

// Use i18n composable to make menu items reactive to language changes
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

// Generate menu items reactively - will update when language changes
const menuItems = computed<MenuItem[]>(() => {
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
      caption: config.caption,
      icon: config.icon,
      route: { name: routeName },
    }
  })
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
