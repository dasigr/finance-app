describe('Account', () => {
  beforeEach(() => {
    cy.viewport(375, 667)

    cy.visit('/')

    const user = Cypress.env('user')
    cy.login(user.email, user.password)
  })

  it('should be able to create accounts', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "account" and click it
      cy.get('a[href*="/dashboard/account"]').click()
    })
    
    cy.fixture('account').then((accounts) => {
      accounts.map((account: any) => {
        cy.get('main').within(() => {
          // The new url should include "/dashboard/account"
          cy.url().should('include', '/dashboard/account')

          // The new page should contain an h1 with "Account"
          cy.get('h1').contains('Account')

          cy.get('a[href*="/dashboard/account/create"]').click()

          // Fill in the create account form.
          cy.get('form#create-account-form').within(() => {
            cy.get('input#name').type(account.name)
            cy.get('input#balance').type(account.balance)
            cy.get('input#weight').type(account.weight)
            cy.get('button#status').click()
            cy.get('button').contains('Save').click()
          })

          // Assert that the account is created.
          cy.root().contains(account.name)
        })
      })
    })
  })
})
