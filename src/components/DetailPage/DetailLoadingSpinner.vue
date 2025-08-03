<template>
  <div v-if="loading" class="text-center q-pa-xl" role="status" aria-live="polite" :aria-label="`Loading ${resourceType} details`">
    <q-spinner-dots :size="spinnerSize" :color="spinnerColor" :aria-label="loadingMessage" />
    <p :class="textClass">{{ loadingMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * DetailLoadingSpinner Component
 * Reusable loading spinner for detail pages
 * Eliminates code duplication across all SWAPI resource detail pages
 */

interface Props {
  /** Loading state - controls visibility of the spinner */
  loading: boolean
  /** Resource type for the loading message (e.g., 'film', 'starship', 'person') */
  resourceType: string
  /** Custom loading message - if not provided, uses default pattern */
  customMessage?: string
  /** Spinner size (defaults to '50px') */
  spinnerSize?: string
  /** Spinner color (defaults to 'primary') */
  spinnerColor?: string
  /** Text CSS classes (defaults to 'text-h6 q-mt-md') */
  textClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  spinnerSize: '50px',
  spinnerColor: 'primary',
  textClass: 'text-h6 q-mt-md',
})

// Computed loading message
const loadingMessage = computed(() => {
  if (props.customMessage) {
    return props.customMessage
  }
  return `Loading ${props.resourceType} details...`
})
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Currently uses default Quasar styling with accessibility enhancements
</style>
