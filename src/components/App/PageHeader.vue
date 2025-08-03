<template>
  <div class="row items-center q-mb-lg">
    <q-icon :name="config.icon" size="2rem" :color="config.color" class="q-mr-md" />
    <div>
      <h1 class="text-h4 q-mb-none">{{ title }}</h1>
      <p class="text-subtitle1 text-grey-7 q-mb-none">{{ config.caption }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { getResourceConfig, type ResourceType } from '~/config/resource-icons'

/**
 * Optimized reusable page header component
 * Automatically gets configuration from resource-icons.ts
 * Fully reactive to language changes
 * Eliminates hardcoded strings across all SWAPI resource pages
 */

interface Props {
  /** Resource type (e.g., 'people', 'planets', 'films') */
  resourceType: ResourceType
}

const props = defineProps<Props>()
const { t, locale } = useI18n()

// Reactive computed properties
const config = computed(() => getResourceConfig(props.resourceType))
const title = computed(() => {
  // Access locale to ensure reactivity tracking
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  locale.value
  return t(`${props.resourceType}.entityNamePlural`)
})
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Currently inherits all styles from parent pages
</style>
