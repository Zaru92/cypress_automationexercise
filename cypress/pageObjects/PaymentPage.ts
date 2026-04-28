import type { CardPaymentDetails } from '../testData/paymentFactory';
import { clickQaField, fillQaFields } from './components/FormControls';

export class PaymentPage {
  assertPaymentPageVisible() {
    cy.logStep('Assert payment page is visible');
    cy.url().should('include', 'payment');
    cy.get('.payment-information').should('be.visible');

    return this;
  }

  fillPaymentForm(data: CardPaymentDetails) {
    cy.logStep(`Fill payment form for cardholder: ${data.nameOnCard}`);

    fillQaFields({
      'name-on-card': data.nameOnCard,
      'card-number': data.cardNumber,
      cvc: data.cvc,
      'expiry-month': data.expirationMonth,
      'expiry-year': data.expirationYear,
    });

    return this;
  }

  submitPayment() {
    cy.logStep('Submit payment');
    clickQaField('pay-button');

    return this;
  }
}
