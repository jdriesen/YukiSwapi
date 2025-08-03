/**
 * Component Mount Factory
 * Provides standardized mounting utilities for Vue components in tests
 */

import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { Quasar, Notify, Dark } from 'quasar'
import { createI18n } from 'vue-i18n'
import { vi } from 'vitest'

// Import your i18n messages
import messages from '~/i18n'

// Import commonly used components for testing
import CardTitle from '~/components/Cards/CardTitle.vue'
import CardItem from '~/components/Cards/CardItem.vue'

/**
 * Default mount options for all components
 */
const defaultMountOptions = {
  global: {
    plugins: [
      [
        Quasar,
        {
          plugins: {
            Notify,
            Dark,
          },
        },
      ],
      createI18n({
        locale: 'en-US',
        fallbackLocale: 'en-US',
        messages,
        legacy: false,
      }),
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      }),
    ],
    components: {
      CardTitle,
      CardItem,
    },
    mocks: {
      $t: (key: string, values?: Record<string, unknown>) => {
        // Simple mock translation function
        if (values) {
          let result = key
          Object.entries(values).forEach(([k, v]) => {
            result = result.replace(`{${k}}`, String(v))
          })
          return result
        }
        return key
      },
      $router: {
        push: vi.fn(),
        replace: vi.fn(),
        go: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
      },
      $route: {
        path: '/',
        name: 'home',
        params: {},
        query: {},
        meta: {},
      },
    },
  },
}

/**
 * Factory function to mount Vue components with standard configuration
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mountComponent = (component: any, options: any = {}): VueWrapper<any> => {
  const mountOptions = {
    ...defaultMountOptions,
    ...options,
    global: {
      ...defaultMountOptions.global,
      ...(options.global || {}),
      mocks: {
        ...defaultMountOptions.global.mocks,
        ...(options.global?.mocks || {}),
        ...(options.mocks || {}),
      },
    },
  }

  // Override router mocks if provided
  if (options.router) {
    mountOptions.global.mocks.$router = {
      ...mountOptions.global.mocks.$router,
      ...options.router,
    }
  }

  // Override route mocks if provided
  if (options.route) {
    mountOptions.global.mocks.$route = {
      ...mountOptions.global.mocks.$route,
      ...options.route,
    }
  }

  return mount(component, mountOptions)
}

/**
 * Factory function for shallow mounting (useful for unit tests)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shallowMountComponent = (component: any, options: any = {}): VueWrapper<any> => {
  return mountComponent(component, {
    ...options,
    shallow: true,
  })
}

/**
 * Helper to create a mock router with common methods
 */
export const createMockRouter = (overrides: Record<string, unknown> = {}) => ({
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  currentRoute: {
    value: {
      path: '/',
      name: 'home',
      params: {},
      query: {},
      meta: {},
    },
  },
  ...overrides,
})

/**
 * Helper to create a mock route object
 */
export const createMockRoute = (overrides: Record<string, unknown> = {}) => ({
  path: '/',
  name: 'home',
  params: {},
  query: {},
  meta: {},
  ...overrides,
})

/**
 * Helper to wait for Vue's next tick and any pending promises
 * Useful for testing async operations
 */
export const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0))

/**
 * Helper to trigger events and wait for updates
 */
export const triggerAndWait = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapper: VueWrapper<any>,
  selector: string,
  event: string,
  eventData?: Record<string, unknown>,
) => {
  if (eventData) {
    await wrapper.find(selector).trigger(event, eventData)
  } else {
    await wrapper.find(selector).trigger(event)
  }
  await wrapper.vm.$nextTick()
  await flushPromises()
}

/**
 * Helper to find Quasar components by their tag name
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findQuasarComponent = (wrapper: VueWrapper<any>, componentName: string) => {
  const component = wrapper.find(componentName)
  if (!component.exists()) {
    throw new Error(`Quasar component "${componentName}" not found`)
  }
  return component
}

/**
 * Helper to check if a component emitted a specific event
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasEmitted = (wrapper: VueWrapper<any>, eventName: string): boolean => {
  return wrapper.emitted(eventName) !== undefined
}

/**
 * Helper to get the last emitted event data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLastEmitted = (wrapper: VueWrapper<any>, eventName: string) => {
  const events = wrapper.emitted(eventName)
  return events ? events[events.length - 1] : undefined
}
