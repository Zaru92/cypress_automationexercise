import { clickQaField, fillQaField } from './components/FormControls';

export class LoginSignupPage {
  assertLoginSignupPageVisible() {
    cy.logStep('Assert signup/login page is visible');
    cy.url().should('include', 'login');
    cy.get('#form').should('be.visible');

    return this;
  }

  enterLoginEmail(email: string) {
    cy.logStep(`Enter login email: ${email}`);
    fillQaField('login-email', email);

    return this;
  }

  enterLoginPassword(password: string) {
    cy.logStep('Enter login password');
    fillQaField('login-password', password);

    return this;
  }

  enterSignupName(name: string) {
    cy.logStep(`Enter signup name: ${name}`);
    fillQaField('signup-name', name);

    return this;
  }

  enterSignupEmail(email: string) {
    cy.logStep(`Enter signup email: ${email}`);
    fillQaField('signup-email', email);

    return this;
  }

  submitLogin() {
    cy.logStep('Submit login form');
    clickQaField('login-button');

    return this;
  }

  submitSignup() {
    cy.logStep('Submit signup form');
    clickQaField('signup-button');

    return this;
  }

  assertInvalidLoginErrorMessageVisible() {
    cy.logStep('Assert invalid login error is visible');
    cy.contains('Your email or password is incorrect!').should('be.visible');

    return this;
  }

  assertExistingEmailSignupErrorVisible() {
    cy.logStep('Assert existing email signup error is visible');
    cy.contains('Email Address already exist!').should('be.visible');

    return this;
  }
}
