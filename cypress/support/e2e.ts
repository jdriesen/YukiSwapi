// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
Cypress.on('uncaught:exception', (err) => {
  // returning false here prevents Cypress from
  // failing the test on uncaught exceptions
  // This is useful for third-party code that might throw errors
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  return true
})

// Global before hook
beforeEach(() => {
  // Set up any global state before each test
  // For example, you might want to clear localStorage
  cy.clearLocalStorage()

  // Set up viewport for consistent testing
  cy.viewport(1280, 720)
})

// Global after hook
afterEach(() => {
  // Clean up after each test if needed
})
