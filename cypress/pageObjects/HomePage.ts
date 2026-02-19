export class HomePage {
  visit() {
    cy.visit('/');
    return this;
  }

  assertLoaded() {
    cy.get('body').should('be.visible');
    cy.get('#slider-carousel').should('be.visible');
    return this;
  }

  goToSignupLoginPage() {
    cy.get('[href="/login"]').click();
    return this;
  }

  assertLoggedInAs(name: string) {
    cy.contains(`Logged in as ${name}`).should('be.visible');
    return this;
  }

  deleteAccount() {
    cy.get('[href="/delete_account"]').click();
    cy.contains('Account Deleted!').should('be.visible');
    return this;
  }

  continueAfterDeleted() {
    cy.get("[data-qa='continue-button']").click();
    return this;
  }

  assertAccountDeleted(name: string) {
    cy.contains(`Logged in as ${name}`).should('not.exist');
    return this;
  }

  logout() {
    cy.get('[href="/logout"]').click();
    return this;
  }
}
