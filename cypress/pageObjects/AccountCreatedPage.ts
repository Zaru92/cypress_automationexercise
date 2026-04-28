import { clickQaField } from './components/FormControls';

export class AccountCreatedPage {
  assertAccountCreated() {
    cy.logStep('Assert account created page is visible');
    cy.url().should('include', 'account_created');
    cy.contains('Account Created!').should('be.visible');

    return this;
  }

  continueAfterCreation() {
    cy.logStep('Continue after account creation');
    clickQaField('continue-button');

    return this;
  }
}
