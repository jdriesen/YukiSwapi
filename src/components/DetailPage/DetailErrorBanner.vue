<template>
  <q-banner v-if="error" :class="bannerClass" :rounded="rounded" role="alert" aria-live="assertive" :aria-label="`Error: ${errorMessage}`">
    <template #avatar>
      <q-icon :name="iconName" />
    </template>
    {{ errorMessage }}
    <template #action>
      <q-btn v-if="showRetry" flat :color="buttonColor" :label="retryLabel" @click="handleRetry" />
      <q-btn v-if="showBack" flat :color="buttonColor" :label="backLabel" @click="handleBack" />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * DetailErrorBanner Component
 * Reusable error banner for detail pages
 * Eliminates code duplication across all SWAPI resource detail pages
 */

interface Props {
  /** Error message to display - controls visibility of the banner */
  error: string | null
  /** Custom error message - if not provided, uses error prop */
  customMessage?: string
  /** Banner CSS classes (defaults to 'text-white bg-red q-mb-md') */
  bannerClass?: string
  /** Icon name (defaults to 'error') */
  iconName?: string
  /** Button color (defaults to 'white') */
  buttonColor?: string
  /** Retry button label (defaults to 'Retry') */
  retryLabel?: string
  /** Back button label (defaults to 'Back') */
  backLabel?: string
  /** Whether banner should be rounded (defaults to true) */
  rounded?: boolean
  /** Show retry button (defaults to true) */
  showRetry?: boolean
  /** Show back button (defaults to true) */
  showBack?: boolean
}

interface Emits {
  /** Emitted when retry button is clicked */
  retry: []
  /** Emitted when back button is clicked */
  back: []
}

const props = withDefaults(defineProps<Props>(), {
  bannerClass: 'text-white bg-red q-mb-md',
  iconName: 'error',
  buttonColor: 'white',
  retryLabel: 'Retry',
  backLabel: 'Back',
  rounded: true,
  showRetry: true,
  showBack: true,
})

const emit = defineEmits<Emits>()

// Computed error message
const errorMessage = computed(() => {
  if (props.customMessage) {
    return props.customMessage
  }
  return props.error || ''
})

// Event handlers
const handleRetry = () => {
  emit('retry')
}

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Currently uses default Quasar banner styling with accessibility enhancements
</style>
