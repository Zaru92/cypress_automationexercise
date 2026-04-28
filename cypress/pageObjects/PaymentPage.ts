import type { CardPaymentDetails } from '../testData/paymentFactory';
import { clickQaField, fillQaFields } from './components/FormControls';

export class PaymentPage {
  assertPaymentPageVisible() {
    cy.url().should('include', 'payment');
    cy.get('.payment-information').should('be.visible');

    return this;
  }

  fillPaymentForm(data: CardPaymentDetails) {
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
    clickQaField('pay-button');

    return this;
  }
}
