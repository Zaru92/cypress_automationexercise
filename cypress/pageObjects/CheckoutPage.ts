import type { TestUser } from '../testData/userFactory';
import type { ContactFormData } from '../testData/contactFactory';
import { AddressDetailsBlock } from './components/AddressDetailsBlock';

export class CheckoutPage {
  private readonly addressDetailsBlock = new AddressDetailsBlock();

  assertCheckoutPageVisible() {
    cy.logStep('Assert checkout page is visible');
    cy.url().should('include', 'checkout');
    cy.get('#cart_items').should('be.visible');
    return this;
  }

  assertDeliveryAddressDetails(user: TestUser) {
    cy.logStep(`Assert delivery address details for ${user.email}`);
    this.addressDetailsBlock.assertUserAddressVisible('#address_delivery', user);
    return this;
  }

  assertBillingAddressDetails(user: TestUser) {
    cy.logStep(`Assert billing address details for ${user.email}`);
    this.addressDetailsBlock.assertUserAddressVisible('#address_invoice', user);
    return this;
  }

  enterOrderComment(data: ContactFormData) {
    cy.logStep('Enter checkout order comment');
    cy.get('.form-control').clear();
    cy.get('.form-control').type(data.message);
    return this;
  }

  placeOrder() {
    cy.logStep('Place order from checkout page');
    cy.get('.check_out').click();
    return this;
  }
}
