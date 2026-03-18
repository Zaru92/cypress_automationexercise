export class ProductDetailsPage {
  assertProductDetailsPageVisible() {
    cy.url().should('include', 'product_details');
    cy.get('.product-information').should('be.visible');
    cy.get('h2').should('be.visible').and('not.be.empty');
    cy.contains('Category:').should('be.visible');
    cy.contains('Rs.').should('be.visible');
    cy.contains('Availability:').should('be.visible');
    cy.contains('Condition:').should('be.visible');
    cy.contains('Brand:').should('be.visible');
    return this;
  }
}
