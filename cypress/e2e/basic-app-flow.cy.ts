describe('Star Wars App - Basic Flow', () => {
  it('should complete basic user journey', () => {
    // 1. Visit home page
    cy.visit('/')
    cy.contains('Star Wars').should('be.visible')

    // 2. Navigate to People page
    cy.contains('People').click()
    cy.url().should('include', '/people')

    // 3. Verify data loads (table or cards should be visible)
    cy.get('table, .q-card').should('be.visible')

    // 4. Click on first person (try multiple selectors for reliability)
    cy.get('tbody tr:first a, .q-card:first a, [href*="/people/"]').first().click()

    // 5. Verify detail page loads
    cy.url().should('include', '/people/')
    cy.get('h1, h2').should('be.visible')
  })
})
