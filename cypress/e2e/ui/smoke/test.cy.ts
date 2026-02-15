describe('Smoke | Home', () => {
  it('loads home page and shows key sections', () => {
    cy.openProducts();
    cy.searchProduct('dress');
  });
});
