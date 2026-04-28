import type { TestUser } from '../testData/userFactory';
import {
  assertQaFieldValue,
  clickQaField,
  fillQaFields,
  selectQaField,
} from './components/FormControls';

export class SignupPage {
  assertSignupFormVisible() {
    cy.url().should('include', 'signup');
    cy.get('#form').should('be.visible');
    return this;
  }

  fillAccountInformation(user: TestUser) {
    if (user.title === 'Mr') cy.get('#id_gender1').check();
    else cy.get('#id_gender2').check();

    assertQaFieldValue('name', user.name);
    assertQaFieldValue('email', user.email);
    fillQaFields({ password: user.password });
    selectQaField('days', user.dob.day);
    selectQaField('months', user.dob.month);
    selectQaField('years', user.dob.year);
    return this;
  }

  selectNewsletterAndOffers() {
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    return this;
  }

  fillAddressDetails(user: TestUser) {
    fillQaFields({
      first_name: user.firstName,
      last_name: user.lastName,
      company: user.company,
      address: user.address1,
      address2: user.address2,
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobile_number: user.mobile,
    });
    selectQaField('country', user.country);
    return this;
  }

  confirmAccountCreation() {
    clickQaField('create-account');
    return this;
  }
}
