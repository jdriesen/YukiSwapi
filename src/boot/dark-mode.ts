import { boot } from 'quasar/wrappers'
import { Dark } from 'quasar'

/**
 * Boot file for initializing Quasar Dark Mode plugin
 * Sets up automatic theme detection and localStorage persistence
 */
export default boot(() => {
  // Set dark mode based on user's system preference or saved preference
  // The 'auto' mode will automatically detect the user's system preference
  // and can be overridden by user interaction
  Dark.set('auto')
})
