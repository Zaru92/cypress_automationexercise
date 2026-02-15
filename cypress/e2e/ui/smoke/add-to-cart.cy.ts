describe('Smoke | Add to cart', () => {
  it('searches product and adds first result to cart', () => {
    cy.openProducts();
    cy.searchProduct('dress');

    cy.addFirstProductToCart();
    cy.continueShoppingFromModal();

    cy.get("a[href='/view_cart']").click();
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table').should('be.visible');
  });
});
