describe('Smoke | Add to cart', () => {
  it('searches product and adds first result to cart', () => {
    cy.openProducts();
    cy.searchProduct('dress');

    cy.addFirstProductToCart();
    cy.continueShoppingFromModal();
  });
});
