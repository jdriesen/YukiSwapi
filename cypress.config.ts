import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,

    // Test file patterns
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Support file
    supportFile: 'cypress/support/e2e.ts',

    // Fixtures folder
    fixturesFolder: 'cypress/fixtures',

    // Screenshots and videos
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Downloads folder
    downloadsFolder: 'cypress/downloads',

    // Environment variables
    env: {
      apiUrl: 'https://swapi.dev/api',
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },

  // Global configuration
  retries: {
    runMode: 2,
    openMode: 0,
  },

  // Browser configuration
  chromeWebSecurity: false,
})
