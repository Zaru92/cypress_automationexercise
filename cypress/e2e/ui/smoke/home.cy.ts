describe('Smoke | Home', () => {
  it('loads home page and shows key sections', () => {
    cy.visit('/');
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible');
    cy.get("a[href='/products']").should('be.visible');
  });
});
