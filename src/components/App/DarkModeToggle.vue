<template>
  <q-btn
    flat
    round
    dense
    :icon="isDark ? 'light_mode' : 'dark_mode'"
    :aria-label="toggleLabel"
    @click="toggleDarkMode"
    class="dark-mode-toggle">
    <q-tooltip class="bg-primary text-white shadow-4" :offset="[10, 10]">
      {{ tooltipText }}
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Dark } from 'quasar'

/**
 * Dark Mode Toggle Component
 * Provides a clean toggle button for switching between light and dark themes
 * Uses Quasar's Dark plugin for theme management with localStorage persistence
 */

// Computed properties for reactive UI updates
const isDark = computed(() => Dark.isActive)

const toggleLabel = computed(() => (isDark.value ? 'Switch to light mode' : 'Switch to dark mode'))

const tooltipText = computed(() => (isDark.value ? 'Switch to Light Mode' : 'Switch to Dark Mode'))

/**
 * Toggle between dark and light modes
 * Uses Quasar's Dark.toggle() method which automatically handles:
 * - Theme switching
 * - localStorage persistence
 * - CSS class updates
 */
const toggleDarkMode = (): void => {
  Dark.toggle()
}
</script>

<style lang="scss" scoped>
.dark-mode-toggle {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  // Smooth icon transition
  .q-icon {
    transition: transform 0.3s ease;
  }
}
</style>
