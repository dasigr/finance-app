// cypress/cypress.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command for Next.js-specific functionality.
     */
    login(email: string, password: string): Chainable<void>;
  }
}
