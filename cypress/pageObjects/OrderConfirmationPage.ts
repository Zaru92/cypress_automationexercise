import { clickQaField } from './components/FormControls';

export class OrderConfirmationPage {
  assertOrderPlaced() {
    cy.logStep('Assert order placed confirmation is visible');
    cy.url().should('include', 'payment_done');
    cy.contains('Order Placed!').should('be.visible');
    return this;
  }

  continueAfterPlacement() {
    cy.logStep('Continue after order placement');
    clickQaField('continue-button');
    return this;
  }

  downloadInvoice() {
    cy.logStep('Download invoice and assert file content');
    const invoicePath = 'cypress/downloads/invoice.txt';
    cy.task('deleteFileIfExists', invoicePath);

    cy.get('.check_out').click();
    cy.readFile(invoicePath, { timeout: 15000 })
      .should('not.be.empty')
      .and('contain', 'Your total purchase amount');
    return this;
  }
}
