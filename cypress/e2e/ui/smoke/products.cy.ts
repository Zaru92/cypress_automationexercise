describe('Smoke | Products', () => {
  it('opens products page and navigates to product details', () => {
    cy.visit('/products');
    cy.contains('All Products').should('be.visible');

    cy.contains('View Product').first().click();
    cy.url().should('include', '/product_details');
    cy.get('.product-information').should('be.visible');
  });
});
