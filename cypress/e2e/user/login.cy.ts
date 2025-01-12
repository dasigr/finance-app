describe('Navigation', () => {
  beforeEach(() => {
    cy.viewport(375, 667)
  })

  afterEach(() => {
    cy.wait(2000)
  })

  it('should navigate to the income page', () => {
    cy.visit('/')

    cy.get('main').within(() => {
      // Click on the Log in button.
      cy.get('a[href*="/login"]').click()

      cy.get('form').within(() => {
        // Fill in the login form.
        cy.get('input#email').type('test-engineer@a5project.com')
        cy.get('input#password').type('T064vYL3LkZ9sGvB')
        cy.get('button').contains('Log in').click()
      })
    })

    // Assert that you're able to access the dashboard page.
    cy.get('main').should('contain', 'Budget')
  })
})
