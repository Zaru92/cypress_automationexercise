export class ProductDetailsPage {
  assertProductDetailsPageVisible() {
    cy.url().should('include', 'product_details');
    cy.get('.product-information').should('be.visible');
    return this;
  }
}
