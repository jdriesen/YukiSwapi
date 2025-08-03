import { boot } from 'quasar/wrappers'
import type { Component } from 'vue'

/**
 * Register components globally
 *
 * This boot file automatically registers all Vue components in the components directory
 * so they can be used in templates without explicitly importing them in each component.
 *
 * Features:
 * - Modern Vite typing for type safety
 * - Error handling for malformed component files
 * - Validation to ensure components are valid Vue components
 * - Better logging with component file paths
 * - Performance optimization for the registration process
 */

interface RegistrationResults {
  registered: number
  skipped: number
  errors: number
}

/**
 * Validates if a module export is a valid Vue component
 * @param component - The component to validate
 * @returns True if the component is valid
 */
const isValidVueComponent = (component: unknown): component is Component => {
  if (!component || typeof component !== 'object') {
    return false
  }

  // Type assertion for component properties check
  const comp = component as Record<string, unknown>

  // Check for Vue component indicators
  // Vue 3 components can be objects with setup, render, or template properties
  const hasVueProperties =
    typeof comp.setup === 'function' ||
    typeof comp.render === 'function' ||
    typeof comp.template === 'string' ||
    Boolean(comp.__vccOpts) || // Vue SFC compiled component
    Boolean(comp._isVue) || // Vue 2 compatibility
    Boolean(comp.__hmrId) // Vite HMR identifier

  return hasVueProperties
}

/**
 * Converts a filename to PascalCase for component registration
 * @param fileName - The original filename
 * @returns PascalCase component name
 */
const toPascalCase = (fileName: string): string => {
  return (
    fileName
      // Convert kebab-case to camelCase (e.g., 'entity-table' -> 'entityTable')
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      // Capitalize first letter (e.g., 'entityTable' -> 'EntityTable')
      .replace(/^[a-z]/, (letter) => letter.toUpperCase())
  )
}

/**
 * Registers a single component with the Vue app
 * @param app - Vue application instance
 * @param filePath - Full file path of the component
 * @param component - The Vue component to register
 * @returns The registered component name
 */
const registerComponent = (
  app: { component: (name: string, component: Component) => void },
  filePath: string,
  component: Component,
): string => {
  // Extract component name from the file path
  const fileName =
    filePath
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '') || ''

  if (!fileName) {
    throw new Error(`Could not extract filename from path: ${filePath}`)
  }

  // Convert to PascalCase for component name
  const componentName = toPascalCase(fileName)

  // Register the component globally
  app.component(componentName, component)

  return componentName
}

/**
 * Logs component registration details in development mode
 * @param level - Log level (info, warn, error)
 * @param message - Main message
 * @param filePath - Component file path
 * @param details - Additional details
 */
const logComponent = (level: 'info' | 'warn' | 'error', message: string, filePath: string, details?: Record<string, unknown>) => {
  if (process.env.NODE_ENV !== 'development') return

  const fileName = filePath.split('/').pop() || filePath
  const logMessage = `Component Registration: ${message} - ${fileName}`

  switch (level) {
    case 'info':
      console.log(`✅ ${logMessage}`, details ? { path: filePath, ...details } : { path: filePath })
      break
    case 'warn':
      console.warn(`⚠️ ${logMessage}`, details ? { path: filePath, ...details } : { path: filePath })
      break
    case 'error':
      console.error(`❌ ${logMessage}`, details ? { path: filePath, error: details } : { path: filePath })
      break
  }
}

/**
 * Logs the final registration summary
 * @param results - Registration results
 * @param duration - Time taken for registration
 */
const logRegistrationSummary = (results: RegistrationResults, duration: number) => {
  if (process.env.NODE_ENV !== 'development') return

  const total = results.registered + results.skipped + results.errors

  console.group('🔧 Global Component Registration Summary')
  console.log(`📊 Total components processed: ${total}`)
  console.log(`✅ Successfully registered: ${results.registered}`)

  if (results.skipped > 0) {
    console.log(`⚠️ Skipped (invalid): ${results.skipped}`)
  }

  if (results.errors > 0) {
    console.log(`❌ Errors encountered: ${results.errors}`)
  }

  console.log(`⏱️ Registration completed in: ${duration.toFixed(2)}ms`)
  console.groupEnd()
}

export default boot(({ app }) => {
  const startTime = performance.now()

  try {
    // Use modern Vite typing for type safety
    const components = import.meta.glob('../components/**/*.vue', {
      eager: true,
    })

    const results: RegistrationResults = {
      registered: 0,
      skipped: 0,
      errors: 0,
    }

    // Process each component with error handling and validation
    Object.entries(components).forEach(([filePath, module]) => {
      try {
        // Type assertion for module structure
        const typedModule = module as { default?: Component }

        // Validate that the module has a default export
        if (!typedModule?.default) {
          logComponent('warn', 'No default export found', filePath)
          results.skipped++
          return
        }

        // Validate that it's a proper Vue component
        if (!isValidVueComponent(typedModule.default)) {
          logComponent('warn', 'Invalid Vue component structure', filePath, {
            reason: 'Missing Vue component properties (setup, render, template, etc.)',
          })
          results.skipped++
          return
        }

        // Register the component
        const componentName = registerComponent(app, filePath, typedModule.default)

        logComponent('info', `Registered as "${componentName}"`, filePath)
        results.registered++
      } catch (error) {
        // Type assertion for error logging
        const errorDetails = error instanceof Error ? { message: error.message, stack: error.stack } : { error: String(error) }
        logComponent('error', 'Registration failed', filePath, errorDetails)
        results.errors++
      }
    })

    // Log final summary with performance metrics
    const duration = performance.now() - startTime
    logRegistrationSummary(results, duration)

    // Warn if no components were registered
    if (results.registered === 0 && Object.keys(components).length > 0) {
      console.warn('⚠️ No components were successfully registered. Check component files for issues.')
    }
  } catch (error) {
    console.error('❌ Critical error during component registration:', error)

    // In development, provide helpful debugging information
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 Debugging Information')
      console.log('- Check that component files are valid Vue SFCs')
      console.log('- Ensure components have proper default exports')
      console.log('- Verify file paths and naming conventions')
      console.groupEnd()
    }
  }
})
