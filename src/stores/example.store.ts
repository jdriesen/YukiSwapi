import { defineStore, acceptHMRUpdate } from 'pinia'

/**
 * Main application store
 * This store can be used for global application state
 */
export const useAppStore = defineStore('app', {
  state: () => ({
    // Global application state will be defined here
    // Example: loading states, user preferences, etc.
    isLoading: false,
    currentSection: 'home',
  }),

  getters: {
    // Computed properties based on state
    isCurrentSection: (state) => (section: string) => state.currentSection === section,
  },

  actions: {
    // Actions to modify state
    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setCurrentSection(section: string) {
      this.currentSection = section
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
