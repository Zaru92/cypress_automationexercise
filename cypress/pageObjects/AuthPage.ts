export class AuthPage {
  assertLoginOrSignupPageVisible() {
    cy.url().should('include', 'login');
    cy.get('#form').should('be.visible');
    return this;
  }

  enterLoginEmail(email: string) {
    cy.get("[data-qa='login-email']").clear().type(email);
    return this;
  }

  enterPassword(password: string) {
    cy.get("[data-qa='login-password']").clear().type(password);
    return this;
  }

  enterSignupName(name: string) {
    cy.get("[data-qa='signup-name']").clear().type(name);
    return this;
  }

  enterSignupEmail(email: string) {
    cy.get("[data-qa='signup-email']").clear().type(email);
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

  assertInvalidLoginErrorMessageVisible() {
    cy.contains('Your email or password is incorrect!').should('be.visible');
    return this;
  }

  assertInvalidSignUpErrorMessageVisible() {
    cy.contains('Email Address already exist!').should('be.visible');
    return this;
  }
}
