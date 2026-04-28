import type { PaymentDetails } from '../testData/paymentFactory';

export class PaymentPage {
  assertPaymentPageVisible() {
    cy.url().should('include', 'payment');
    cy.get('.payment-information').should('be.visible');

    return this;
  }

  fillForm(data: PaymentDetails) {
    cy.get('[data-qa="name-on-card"]').clear();
    cy.get('[data-qa="name-on-card"]').type(data.nameOnCard);
    cy.get('[data-qa="card-number"]').clear();
    cy.get('[data-qa="card-number"]').type(data.cardNumber);
    cy.get('[data-qa="cvc"]').clear();
    cy.get('[data-qa="cvc"]').type(data.cvc);
    cy.get('[data-qa="expiry-month"]').clear();
    cy.get('[data-qa="expiry-month"]').type(data.expirationMonth);
    cy.get('[data-qa="expiry-year"]').clear();
    cy.get('[data-qa="expiry-year"]').type(data.expirationYear);

    return this;
  }

  submit() {
    cy.get('[data-qa="pay-button"]').click();

    return this;
  }
}
