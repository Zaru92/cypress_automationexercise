export class AuthPage {
  assertLoginOrSignupPageVisible() {
    cy.url().should('include', 'login');
    cy.get('#form').should('be.visible');
    return this;
  }

  enterLoginEmail(email: string) {
    cy.get("[data-qa='login-email']").should('be.visible').clear().type(email);
    return this;
  }

  enterPassword(password: string) {
    cy.get("[data-qa='login-password']").should('be.visible').clear().type(password);
    return this;
  }

  enterSignupName(name: string) {
    cy.get("[data-qa='signup-name']").should('be.visible').clear().type(name);
    return this;
  }

  enterSignupEmail(email: string) {
    cy.get("[data-qa='signup-email']").should('be.visible').clear().type(email);
    return this;
  }

  clickLoginButton() {
    cy.get("[data-qa='login-button']").click();
    return this;
  }

  clickSignupButton() {
    cy.get("[data-qa='signup-button']").click();
    return this;
  }
}
