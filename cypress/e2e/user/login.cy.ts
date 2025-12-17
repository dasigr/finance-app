describe('User Login', () => {
  beforeEach(() => {
    cy.viewport(375, 667)

    cy.visit('/')

    const user = Cypress.env('user')
    cy.login(user.email, user.password)
  })

  it('should be redirected to the dashboard page', () => {
    // The new url should include "/dashboard"
    // cy.url().should('include', '/dashboard')

    // Assert that you're able to access the dashboard page.
    cy.get('main').within(() => {
      cy.root().should('contain', 'Income')
      cy.root().should('contain', 'Expenses')
      cy.root().should('contain', 'Account')
      cy.root().should('contain', 'Budget')
    })
  })
})
