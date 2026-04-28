import type { User } from '../testData/userFactory';
import type { ContactMessage } from '../testData/contactFactory';
import { AddressBlockComponent } from './components/AddressBlockComponent';

export class CheckoutPage {
  private readonly addressBlock = new AddressBlockComponent();

  assertCheckoutPageVisible() {
    cy.url().should('include', 'checkout');
    cy.get('#cart_items').should('be.visible');
    return this;
  }

  assertAddressDetails(user: User) {
    this.addressBlock.assertUserAddressVisible('#address_delivery', user);
    return this;
  }

  assertBillingDetails(user: User) {
    this.addressBlock.assertUserAddressVisible('#address_invoice', user);
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
