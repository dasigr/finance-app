describe('Navigation', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.visit('dashboard')
  })

  it('should navigate to the income page', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "income" and click it
      cy.get('a[href*="/dashboard/income"]').click()
      
      // The new url should include "/dashboard/account"
      cy.url().should('include', '/dashboard/income')

      // The new page should contain an h1 with "Income"
      cy.get('h1').contains('Income')
    })
  })
})
