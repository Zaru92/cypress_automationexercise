export class TestCasesPage {
  assertTestCasesPageVisible() {
    cy.url().should('include', 'test_cases');
    cy.get('#form').should('be.visible');
    return this;
  }
}
