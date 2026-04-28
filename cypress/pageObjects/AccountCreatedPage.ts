import { clickQaField } from './components/FormControls';

export class AccountCreatedPage {
  assertAccountCreated() {
    cy.url().should('include', 'account_created');
    cy.contains('Account Created!').should('be.visible');
    return this;
  }

  continueAfterCreation() {
    clickQaField('continue-button');
    return this;
  }
}
