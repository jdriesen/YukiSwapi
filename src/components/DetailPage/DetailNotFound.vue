<template>
  <div class="text-center q-pa-xl" role="status" aria-live="polite" :aria-label="`${resourceType} not found`">
    <q-icon :name="iconName" :size="iconSize" :color="iconColor" :aria-label="notFoundTitle" />
    <h2 :class="titleClass">{{ notFoundTitle }}</h2>
    <p :class="messageClass">{{ notFoundMessage }}</p>
    <q-btn :color="buttonColor" :label="buttonLabel" @click="handleBack" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * DetailNotFound Component
 * Reusable "not found" state for detail pages
 * Eliminates code duplication across all SWAPI resource detail pages
 */

interface Props {
  /** Resource type (e.g., 'starship', 'person', 'planet') */
  resourceType: string
  /** Resource type plural (e.g., 'starships', 'people', 'planets') */
  resourceTypePlural: string
  /** Custom icon name - if not provided, uses default pattern */
  customIcon?: string
  /** Custom title - if not provided, uses default pattern */
  customTitle?: string
  /** Custom message - if not provided, uses default pattern */
  customMessage?: string
  /** Custom button label - if not provided, uses default pattern */
  customButtonLabel?: string
  /** Icon size (defaults to '6rem') */
  iconSize?: string
  /** Icon color (defaults to 'grey-4') */
  iconColor?: string
  /** Title CSS classes (defaults to 'text-h5 text-grey-6 q-mt-md') */
  titleClass?: string
  /** Message CSS classes (defaults to 'text-body1 text-grey-5') */
  messageClass?: string
  /** Button color (defaults to 'primary') */
  buttonColor?: string
}

interface Emits {
  /** Emitted when back button is clicked */
  back: []
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: '6rem',
  iconColor: 'grey-4',
  titleClass: 'text-h5 text-grey-6 q-mt-md',
  messageClass: 'text-body1 text-grey-5',
  buttonColor: 'primary',
})

const emit = defineEmits<Emits>()

// Icon mapping for different resource types
const iconMap: Record<string, string> = {
  starship: 'rocket_launch_off',
  vehicle: 'no_crash',
  person: 'person_off',
  planet: 'public_off',
  species: 'pets_off',
  film: 'movie_off',
}

// Computed properties
const iconName = computed(() => {
  if (props.customIcon) {
    return props.customIcon
  }
  return iconMap[props.resourceType] || 'help_outline'
})

const notFoundTitle = computed(() => {
  if (props.customTitle) {
    return props.customTitle
  }
  const capitalizedResource = props.resourceType.charAt(0).toUpperCase() + props.resourceType.slice(1)
  return `${capitalizedResource} Not Found`
})

const notFoundMessage = computed(() => {
  if (props.customMessage) {
    return props.customMessage
  }
  return `The requested ${props.resourceType} could not be found.`
})

const buttonLabel = computed(() => {
  if (props.customButtonLabel) {
    return props.customButtonLabel
  }
  const capitalizedPlural = props.resourceTypePlural.charAt(0).toUpperCase() + props.resourceTypePlural.slice(1)
  return `Back to ${capitalizedPlural}`
})

// Event handlers
const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Currently uses default Quasar styling with accessibility enhancements
</style>
