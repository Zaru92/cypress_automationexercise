export class HeaderComponent {
  goToProductsPage() {
    cy.logStep('Click Products navigation link');
    cy.get('[href="/products"]').click();
    return this;
  }

  goToSignupLoginPage() {
    cy.logStep('Click Signup/Login navigation link');
    cy.get('[href="/login"]').first().click();
    return this;
  }

  goToCartPage() {
    cy.logStep('Click Cart navigation link');
    cy.get('[href="/view_cart"]').first().click();
    return this;
  }

  goToTestCasesPage() {
    cy.logStep('Click Test Cases navigation link');
    cy.contains('a', 'Test Cases').click();
    return this;
  }

  goToContactUsPage() {
    cy.logStep('Click Contact us navigation link');
    cy.get('[href="/contact_us"]').click();
    return this;
  }

  assertLoggedInAs(name: string) {
    cy.logStep(`Assert header shows logged-in user: ${name}`);
    cy.contains(`Logged in as ${name}`).should('be.visible');
    return this;
  }

  assertLoggedOut(name: string) {
    cy.logStep(`Assert header does not show user: ${name}`);
    cy.contains(`Logged in as ${name}`).should('not.exist');
    return this;
  }

  deleteAccount() {
    cy.logStep('Click Delete Account navigation link');
    cy.get('[href="/delete_account"]').click();
    return this;
  }

  logout() {
    cy.logStep('Click Logout navigation link');
    cy.get('[href="/logout"]').click();
    return this;
  }
}
