import { User } from '../testData/userFactory';

export class HomePage {
  visit() {
    cy.visit('/');
    return this;
  }

  assertLoaded() {
    cy.get('body').should('be.visible');
    cy.get('#slider-carousel').should('be.visible');
    return this;
  }

  goToProductsPage() {
    cy.get('[href="/products"]').click();
    return this;
  }

  goToSignupLoginPage() {
    cy.get('[href="/login"]').click();
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

  viewCategory(category: string, subcategory: string) {
    cy.get('#accordian').should('be.visible');
    cy.get(`#accordian a[href="#${category}"]`).click();
    cy.contains(`#${category} a`, subcategory).click();
    return this;
  }

  viewFirstProduct() {
    cy.get('[href="/product_details/1"]').click();
    return this;
  }

  addToCart(productId: number) {
    cy.get(`a[data-product-id="${productId}"]`).first().click();
    cy.contains('Added!').should('be.visible');
    return this;
  }

  continueShopping() {
    cy.get('.close-modal').click();
    return this;
  }

  viewCart() {
    cy.contains('View Cart').should('be.visible').click();
    return this;
  }

  assertLoggedInAs(name: string) {
    cy.contains(`Logged in as ${name}`).should('be.visible');
    return this;
  }

  deleteAccount() {
    cy.get('[href="/delete_account"]').click();
    cy.contains('Account Deleted!').should('be.visible');
    return this;
  }

  continueAfterDeleted() {
    cy.get("[data-qa='continue-button']").click();
    return this;
  }

  assertAccountDeleted(name: string) {
    cy.contains(`Logged in as ${name}`).should('not.exist');
    return this;
  }

  logout() {
    cy.get('[href="/logout"]').click();
    return this;
  }

  submitSubscription(email: string) {
    cy.contains('Subscription').should('be.visible');
    cy.get('#susbscribe_email').click().clear().type(email);
    cy.get('#subscribe').click();
    return this;
  }

  assertSubscriptionSuccessMessageVisible() {
    cy.get(`#success-subscribe`).should('be.visible');
    cy.contains('You have been successfully subscribed!').should('be.visible');
    return this;
  }

  getFirstVisibleRecommendedProductId() {
    return cy
      .get('.carousel-inner .add-to-cart')
      .first()
      .invoke('attr', 'data-product-id')
      .then((productId) => {
        expect(productId, 'first visible product id').to.exist;
        return Number(productId);
      });
  }

  addToCartFirstVisibleRecommendedProduct(productId: number) {
    cy.get(`a[data-product-id="${productId}"]`).first().click();
    cy.contains('Added!').should('be.visible');
    return this;
  }
}
