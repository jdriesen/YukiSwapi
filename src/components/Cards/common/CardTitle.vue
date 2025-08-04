<template>
  <div class="row items-center q-mb-xs q-mt-xs">
    <q-icon :name="icon" size="2rem" :color="iconColor" class="q-mr-sm" />
    <div>
      <h5 class="text-h5 q-mb-none q-mt-none">{{ title }}</h5>
      <p class="text-subtitle1 text-grey-7 q-mb-none">{{ subtitle }}</p>
    </div>
  </div>
  <q-separator class="q-mb-xs" />
</template>

<script setup lang="ts">
/**
 * CardTitle Component
 * Reusable card title component for all card types
 * Provides consistent styling and structure for card headers
 * with customizable icon, title, and subtitle
 */

interface Props {
  /** Main title text (e.g., "Luke Skywalker", "Tatooine") */
  title: string
  /** Subtitle text (e.g., "Character Details", "Planet Details") */
  subtitle: string
  /** Icon name for the card type (defaults to 'person') */
  icon?: string
  /** Icon color (defaults to 'primary') */
  iconColor?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'person',
  iconColor: 'primary',
})
</script>

<style lang="scss" scoped>
// No additional styles needed - uses Quasar utility classes
</style>
