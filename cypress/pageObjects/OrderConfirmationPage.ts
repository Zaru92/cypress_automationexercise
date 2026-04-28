export class OrderConfirmationPage {
  assertOrderPlaced() {
    cy.url().should('include', 'payment_done');
    cy.contains('Order Placed!').should('be.visible');
    return this;
  }

  continueAfterPlacement() {
    cy.get('[data-qa="continue-button"]').click();
    return this;
  }

  downloadInvoice() {
    const invoicePath = 'cypress/downloads/invoice.txt';
    cy.task('deleteFileIfExists', invoicePath);

    cy.get('.check_out').click();
    cy.readFile(invoicePath, { timeout: 15000 })
      .should('not.be.empty')
      .and('contain', 'Your total purchase amount');
    return this;
  }
}
