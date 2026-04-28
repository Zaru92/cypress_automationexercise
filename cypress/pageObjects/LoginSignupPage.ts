import { clickQaField, fillQaField } from './components/FormControls';

export class LoginSignupPage {
  assertLoginSignupPageVisible() {
    cy.url().should('include', 'login');
    cy.get('#form').should('be.visible');
    return this;
  }

  enterLoginEmail(email: string) {
    fillQaField('login-email', email);
    return this;
  }

  enterLoginPassword(password: string) {
    fillQaField('login-password', password);
    return this;
  }

  enterSignupName(name: string) {
    fillQaField('signup-name', name);
    return this;
  }

  enterSignupEmail(email: string) {
    fillQaField('signup-email', email);
    return this;
  }

  submitLogin() {
    clickQaField('login-button');
    return this;
  }

  submitSignup() {
    clickQaField('signup-button');
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
