import type { User } from '../testData/userFactory';
import type { ContactMessage } from '../testData/contactFactory';

export class CheckoutPage {
  assertCheckoutPageVisible() {
    cy.url().should('include', 'checkout');
    cy.get('#cart_items').should('be.visible');
    return this;
  }

  assertAddressDetails(user: User) {
    cy.get('#address_delivery').within(() => {
      cy.contains(user.firstName);
      cy.contains(user.lastName);
      cy.contains(user.company);
      cy.contains(user.address1);
      cy.contains(user.address2);
      cy.contains(user.city);
      cy.contains(user.state);
      cy.contains(user.zipcode);
      cy.contains(user.country);
      cy.contains(user.mobile);
    });
    return this;
  }

  assertBillingDetails(user: User) {
    cy.get('#address_invoice').within(() => {
      cy.contains(user.firstName);
      cy.contains(user.lastName);
      cy.contains(user.company);
      cy.contains(user.address1);
      cy.contains(user.address2);
      cy.contains(user.city);
      cy.contains(user.state);
      cy.contains(user.zipcode);
      cy.contains(user.country);
      cy.contains(user.mobile);
    });
    return this;
  }

  fillForm(data: ContactMessage) {
    cy.get('.form-control').clear();
    cy.get('.form-control').type(data.message);
    return this;
  }

  placeOrder() {
    cy.get('.check_out').click();
    return this;
  }
}
