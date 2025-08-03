/// <reference types="cypress" />

// ***********************************************
// Simple Cypress Commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Visit page and wait for content to be visible
       * @param url - The URL to visit
       */
      visitAndWait(url: string): Chainable<void>

      /**
       * Click element and verify URL change
       * @param selector - Element selector to click
       * @param expectedUrl - Expected URL fragment after click
       */
      clickAndVerify(selector: string, expectedUrl: string): Chainable<void>
    }
  }
}

// Visit page and wait for content
Cypress.Commands.add('visitAndWait', (url: string) => {
  cy.visit(url)
  cy.get('body').should('be.visible')
})

// Click element and verify navigation
Cypress.Commands.add('clickAndVerify', (selector: string, expectedUrl: string) => {
  cy.get(selector).click()
  cy.url().should('include', expectedUrl)
})

// Prevent TypeScript errors
export {}
