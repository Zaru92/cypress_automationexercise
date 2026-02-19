import { User } from '../testData/userFactory';

export class SignupPage {
  assertSignupFormVisible() {
    cy.url().should('include', 'signup');
    cy.get('#form').should('be.visible');
    return this;
  }

  fillAccountInformation(user: User) {
    if (user.title === 'Mr') cy.get('#id_gender1').check();
    else cy.get('#id_gender2').check();

    cy.get("[data-qa='name']").should('have.value', user.name);
    cy.get("[data-qa='email']").should('have.value', user.email);

    cy.get("[data-qa='password']").type(user.password);

    cy.get("[data-qa='days']").select(user.dob.day);
    cy.get("[data-qa='months']").select(user.dob.month);
    cy.get("[data-qa='years']").select(user.dob.year);

    return this;
  }

  selectNewsletterAndOffers() {
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    return this;
  }

  fillAddressDetails(user: User) {
    cy.get("[data-qa='first_name']").type(user.firstName);
    cy.get("[data-qa='last_name']").type(user.lastName);
    cy.get("[data-qa='company']").type(user.company);
    cy.get("[data-qa='address']").type(user.address1);
    cy.get("[data-qa='address2']").type(user.address2);
    cy.get("[data-qa='country']").select(user.country);
    cy.get("[data-qa='state']").type(user.state);
    cy.get("[data-qa='city']").type(user.city);
    cy.get("[data-qa='zipcode']").type(user.zipcode);
    cy.get("[data-qa='mobile_number']").type(user.mobile);
    return this;
  }

  confirmAccountCreation() {
    cy.get("[data-qa='create-account']").click();
    return this;
  }
}
