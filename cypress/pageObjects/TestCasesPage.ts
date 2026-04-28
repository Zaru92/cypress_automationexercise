export class TestCasesPage {
  assertTestCasesPageVisible() {
    cy.logStep('Assert test cases page is visible');
    cy.url().should('include', 'test_cases');
    cy.get('#form').should('be.visible');
    return this;
  }
}
