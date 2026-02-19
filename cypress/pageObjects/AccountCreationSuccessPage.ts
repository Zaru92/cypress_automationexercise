export class AccountCreationSuccessPage {
  assertAccountCreated() {
    cy.url().should('include', 'account_created');
    cy.contains('Account Created!').should('be.visible');
    return this;
  }

  continueAfterCreation() {
    cy.get("[data-qa='continue-button']").click();
    return this;
  }
}
