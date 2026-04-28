import type { TestUser } from '../testData/userFactory';
import type { ContactFormData } from '../testData/contactFactory';
import { AddressDetailsBlock } from './components/AddressDetailsBlock';

export class CheckoutPage {
  private readonly addressDetailsBlock = new AddressDetailsBlock();

  assertCheckoutPageVisible() {
    cy.url().should('include', 'checkout');
    cy.get('#cart_items').should('be.visible');
    return this;
  }

  assertDeliveryAddressDetails(user: TestUser) {
    this.addressDetailsBlock.assertUserAddressVisible('#address_delivery', user);
    return this;
  }

  assertBillingAddressDetails(user: TestUser) {
    this.addressDetailsBlock.assertUserAddressVisible('#address_invoice', user);
    return this;
  }

  enterOrderComment(data: ContactFormData) {
    cy.get('.form-control').clear();
    cy.get('.form-control').type(data.message);
    return this;
  }

  placeOrder() {
    cy.get('.check_out').click();
    return this;
  }
}
