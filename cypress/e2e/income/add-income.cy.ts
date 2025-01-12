describe('Income', () => {
  beforeEach(() => {
    cy.viewport(375, 667)

    cy.visit('/')

    cy.login('test-engineer@a5project.com', 'T064vYL3LkZ9sGvB')
  })

  it('should be able to add an income', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "income" and click it
      cy.get('a[href*="/dashboard/income"]').click()
      
      // The new url should include "/dashboard/account"
      cy.url().should('include', '/dashboard/income')

      // The new page should contain an h1 with "Income"
      cy.get('h1').contains('Income')

      cy.get('a[href*="/dashboard/income/create"]').click()
    })

    cy.get('main').within(() => {
      cy.get('form#create-income-form').within(() => {
        // Fill in the create income form.
        cy.get('input#amount').type('100')
        cy.get('select#category').select('Salary')
        cy.get('input#date').type('2025-01-10')
        cy.get('select#account').select('UB')
        cy.get('textarea#notes').type('10th month salary')
        cy.get('button#status').click()
        cy.get('button').contains('Save').click()
      })
    })

    // Assert that the income is created.
    cy.get('main').within(() => {
      cy.root().contains('10th month salary')
    })
  })
})
