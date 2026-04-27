export class OrderPlacementSuccessPage {
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
    cy.get('.check_out').click();
    return this;
  }
}
