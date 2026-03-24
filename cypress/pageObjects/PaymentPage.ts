import type { PaymentDetails } from '../testData/paymentFactory';

export class PaymentPage {
  assertPaymentPageVisible() {
    cy.url().should('include', 'payment');
    cy.get('.payment-information').should('be.visible');

    return this;
  }

  fillForm(data: PaymentDetails) {
    cy.get('[data-qa="name-on-card"]').clear().type(data.nameOnCard);
    cy.get('[data-qa="card-number"]').clear().type(data.cardNumber);
    cy.get('[data-qa="cvc"]').clear().type(data.cvc);
    cy.get('[data-qa="expiry-month"]').clear().type(data.expirationMonth);
    cy.get('[data-qa="expiry-year"]').clear().type(data.expirationYear);

    return this;
  }

  submit() {
    cy.get('[data-qa="pay-button"]').click();

    return this;
  }
}
