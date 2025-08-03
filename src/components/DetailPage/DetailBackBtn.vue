<template>
  <div class="q-mb-lg">
    <q-btn
      flat
      :icon="icon"
      :label="t('common.back')"
      :color="color"
      :loading="loading"
      :class="buttonClass"
      no-caps
      :aria-label="`Navigate back to ${resourceName} list`"
      @click="handleBack" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// import { computed } from 'vue'

/**
 * ItemBackBtn Component
 * Reusable back button for detail pages
 * Eliminates code duplication across all SWAPI resource detail pages
 */

interface Props {
  /** The resource name for the back label (e.g., 'Starships', 'People', 'Planets') */
  resourceName: string
  /** Optional custom back function - if not provided, emits 'back' event */
  onBack?: () => void
  /** Custom back icon (defaults to 'arrow_back') */
  icon?: string
  /** Button color (defaults to 'primary') */
  color?: string
  /** Additional CSS classes */
  buttonClass?: string
  /** Show loading state on button */
  loading?: boolean
}

interface Emits {
  /** Emitted when back button is clicked (if onBack prop is not provided) */
  back: []
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'arrow_back',
  color: 'primary',
  buttonClass: '',
  loading: false,
})

const emit = defineEmits<Emits>()

// Initialize i18n
const { t } = useI18n()

// Computed back label
// const backLabel = computed(() => `Back to ${props.resourceName}`)

// Handle back action
const handleBack = () => {
  if (props.onBack) {
    props.onBack()
  } else {
    emit('back')
  }
}
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Currently uses default Quasar button styling
</style>
