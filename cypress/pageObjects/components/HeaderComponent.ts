export class HeaderComponent {
  goToProductsPage() {
    cy.get('[href="/products"]').click();
    return this;
  }

  goToSignupLoginPage() {
    cy.get('[href="/login"]').first().click();
    return this;
  }

  goToCartPage() {
    cy.get('[href="/view_cart"]').first().click();
    return this;
  }

  goToTestCasesPage() {
    cy.contains('a', 'Test Cases').click();
    return this;
  }

  goToContactUsPage() {
    cy.get('[href="/contact_us"]').click();
    return this;
  }

  assertLoggedInAs(name: string) {
    cy.contains(`Logged in as ${name}`).should('be.visible');
    return this;
  }

  assertLoggedOut(name: string) {
    cy.contains(`Logged in as ${name}`).should('not.exist');
    return this;
  }

  deleteAccount() {
    cy.get('[href="/delete_account"]').click();
    return this;
  }

  logout() {
    cy.get('[href="/logout"]').click();
    return this;
  }
}
