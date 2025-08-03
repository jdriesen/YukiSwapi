/**
 * Vitest Global Setup
 * Configures the testing environment for Vue 3 + Quasar + TypeScript
 */

import { vi, beforeAll, afterAll } from 'vitest'
import { config } from '@vue/test-utils'
import { Quasar, Notify, Dark } from 'quasar'
import { createI18n } from 'vue-i18n'
import { createTestingPinia } from '@pinia/testing'

// Import your i18n messages
import messages from '~/i18n'

// MSW server setup removed - not needed for simple component tests

// Create i18n instance for testing
const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages,
  legacy: false,
})

// Configure Vue Test Utils globally
config.global.plugins = [
  [
    Quasar,
    {
      plugins: {
        Notify,
        Dark,
      },
    },
  ],
  i18n,
]

// Global test utilities
config.global.provide = {
  // Add any global provides here
}

// Mock router for components that use useRouter
const mockRouter = {
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
}

config.global.mocks = {
  $router: mockRouter,
  $route: mockRouter.currentRoute.value,
}

// Mock Pinia for component testing
config.global.plugins.push([
  createTestingPinia({
    createSpy: vi.fn,
    stubActions: false,
  }),
])

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Suppress console warnings in tests
const originalWarn = console.warn
beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Vue received a Component') || args[0].includes('[Vue warn]') || args[0].includes('Quasar'))
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.warn = originalWarn
})
