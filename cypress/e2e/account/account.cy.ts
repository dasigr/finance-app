describe('Account', () => {
  beforeEach(() => {
    cy.viewport(375, 667)

    cy.visit('/')

    const user = Cypress.env('user')
    cy.login(user.email, user.password)
  })

  it('should be able to create an account', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "account" and click it
      cy.get('a[href*="/dashboard/account"]').click()
    })
    
    cy.fixture('accounts').then((accounts) => {
      accounts.map((account: any) => {
        cy.get('main').within(() => {
          // The new url should include "/dashboard/account"
          cy.url().should('include', '/dashboard/account')

          // The new page should contain an h1 with "Account"
          cy.get('h1').contains('Account')

          // Click the Add Account button
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

  it('should be able to edit an account', () => {
    cy.get('main').within(() => {
      // Find a link with an href attribute containing "account" and click it
      cy.get('a[href*="/dashboard/account"]').click()
    })
    
    cy.fixture('accounts').then((accounts) => {
      const account = accounts[0]

      cy.get('main').within(() => {
        // The new url should include "/dashboard/account"
        cy.url().should('include', '/dashboard/account')

        // The new page should contain an h1 with "Account"
        cy.get('h1').contains('Account')

        // Click the name of the account to edit
        cy.contains('a', account.name).click()
        cy.get('a.action--edit-account').should('be.visible').click()

        // Fill in the create account form.
        cy.get('form#edit-account-form').within(() => {
          cy.get('input#name').clear().type(account.name + ' (Updated)')
          cy.get('button').contains('Save').click()
        })

        // Assert that the account is created.
        cy.root().contains(account.name + ' (Updated)').should('not.exist')
      })
    })
  })

  // it('should be able to delete accounts', () => {
  //   cy.get('main').within(() => {
  //     // Find a link with an href attribute containing "account" and click it
  //     cy.get('a[href*="/dashboard/account"]').click()
  //   })
    
  //   cy.fixture('accounts').then((accounts) => {
  //     accounts.map((account: any) => {
  //       cy.get('main').within(() => {
  //         // The new url should include "/dashboard/account"
  //         cy.url().should('include', '/dashboard/account')

  //         // The new page should contain an h1 with "Account"
  //         cy.get('h1').contains('Account')

  //         // Click the name of the account to edit
  //         cy.contains('a', account.name).click()
  //         cy.get('a.action--edit-account').should('be.visible').click()

  //         // Fill in the create account form.
  //         cy.get('form#delete-account-form').within(() => {
  //           cy.get('button').click()
  //         })

  //         // Assert that the account is created.
  //         cy.root().contains(account.name).should('not.exist')
  //       })
  //     })
  //   })
  // })
})
