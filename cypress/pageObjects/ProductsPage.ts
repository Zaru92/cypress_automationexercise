export class ProductsPage {
  assertProductsPageVisible() {
    cy.url().should('include', 'products');
    cy.contains('All Products').should('be.visible');
    return this;
  }

  viewFirstProduct() {
    cy.get('[href="/product_details/1"]').click();
    return this;
  }
}
