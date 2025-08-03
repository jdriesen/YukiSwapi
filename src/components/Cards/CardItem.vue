<template>
  <q-item>
    <q-item-section avatar>
      <q-icon :name="iconName" :color="iconColor" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ fieldName }}</q-item-label>
      <q-item-label caption>{{ fieldValue }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
/**
 * CardItem Component
 * Reusable card item component for displaying field information
 * Provides consistent styling and structure for card field items
 * with customizable icon, colors, and content
 */

interface Props {
  /** Icon name (e.g., 'cake', 'wc', 'height', 'fitness_center') */
  iconName: string
  /** Icon color (e.g., 'orange', 'purple', 'blue', 'red') */
  iconColor: string
  /** Field label text (e.g., translated field name) */
  fieldName: string
  /** Field value to display */
  fieldValue: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
// No additional styles needed - uses Quasar utility classes
</style>
