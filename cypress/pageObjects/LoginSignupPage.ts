export class LoginSignupPage {
  assertLoginSignupPageVisible() {
    cy.url().should('include', 'login');
    cy.get('#form').should('be.visible');
    return this;
  }

  enterLoginEmail(email: string) {
    cy.get("[data-qa='login-email']").clear();
    cy.get("[data-qa='login-email']").type(email);
    return this;
  }

  enterLoginPassword(password: string) {
    cy.get("[data-qa='login-password']").clear();
    cy.get("[data-qa='login-password']").type(password);
    return this;
  }

  enterSignupName(name: string) {
    cy.get("[data-qa='signup-name']").clear();
    cy.get("[data-qa='signup-name']").type(name);
    return this;
  }

  enterSignupEmail(email: string) {
    cy.get("[data-qa='signup-email']").clear();
    cy.get("[data-qa='signup-email']").type(email);
    return this;
  }

  submitLogin() {
    cy.get("[data-qa='login-button']").click();
    return this;
  }

  submitSignup() {
    cy.get("[data-qa='signup-button']").click();
    return this;
  }

  assertInvalidLoginErrorMessageVisible() {
    cy.contains('Your email or password is incorrect!').should('be.visible');
    return this;
  }

  assertExistingEmailSignupErrorVisible() {
    cy.contains('Email Address already exist!').should('be.visible');
    return this;
  }
}
