describe('Navigation', () => {
  beforeEach(() => {
    cy.viewport(375, 667);
    cy.visit('http://localhost:3000/dashboard')
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
  
  it('should navigate to the expenses page', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "expenses" and click it
      cy.get('a[href*="/dashboard/expenses"]').click()
      
      // The new url should include "/dashboard/expenses"
      cy.url().should('include', '/dashboard/expenses')

      // The new page should contain an h1 with "Expenses"
      cy.get('h1').contains('Expenses')
    })
  })
  
  it('should navigate to the account page', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "account" and click it
      cy.get('a[href*="/dashboard/account"]').click()
      
      // The new url should include "/dashboard/account"
      cy.url().should('include', '/dashboard/account')

      // The new page should contain an h1 with "Account"
      cy.get('h1').contains('Account')
    })
  })
  
  it('should navigate to the budget page', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "budget" and click it
      cy.get('a[href*="/dashboard/budget"]').click()
      
      // The new url should include "/dashboard/budget"
      cy.url().should('include', '/dashboard/budget')

      // The new page should contain an h1 with "Budget"
      cy.get('h1').contains('Budget')
    })
  })
})
