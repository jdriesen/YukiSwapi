<template>
  <q-banner v-if="error" class="text-white bg-red q-mb-md" rounded>
    <template #avatar>
      <q-icon name="error" />
    </template>
    {{ error }}
    <template #action>
      <q-btn flat color="white" label="Retry" @click="$emit('retry')" />
      <q-btn flat color="white" label="Dismiss" @click="$emit('dismiss')" />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
/**
 * Reusable error banner component
 * Eliminates code duplication across all SWAPI resource pages
 * Provides consistent error handling UI with retry and dismiss actions
 */

interface Props {
  /** Error message to display, or null/undefined to hide banner */
  error: string | null | undefined
}

interface Emits {
  /** Emitted when user clicks the Retry button */
  retry: []
  /** Emitted when user clicks the Dismiss button */
  dismiss: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style lang="scss" scoped>
// Component-specific styles can be added here if needed
// Currently inherits all styles from Quasar banner component
</style>
