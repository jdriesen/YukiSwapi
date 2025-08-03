// src/composables/useAppInfo.ts
import { reactive, computed } from 'vue'

/**
 * Application information interface
 */
export interface AppInfo {
  name: string
  version: string
}

/**
 * Composable for accessing application information
 * @returns Application information state and computed properties
 */
export function useAppInfo() {
  // Reactive state for application info
  const appInfo = reactive<AppInfo>({
    name: 'Yuki Tech Assement',
    version: import.meta.env.VITE_APP_VERSION || '0.0.0',
  })

  // Computed properties for formatted versions
  const fullVersion = computed(() => `${appInfo.name} v.${appInfo.version}`)

  return {
    // State
    appInfo,

    // Computed properties
    fullVersion,
  }
}
