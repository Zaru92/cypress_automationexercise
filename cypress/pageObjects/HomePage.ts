import { CategoryMenuComponent } from './components/CategoryMenuComponent';
import { ProductListComponent } from './components/ProductListComponent';
import { SubscriptionComponent } from './components/SubscriptionComponent';

export class HomePage {
  private readonly categoryMenu = new CategoryMenuComponent();
  private readonly productList = new ProductListComponent();
  private readonly subscription = new SubscriptionComponent();

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
    this.categoryMenu.viewCategory(category, subcategory);
    return this;
  }

  viewFirstProduct() {
    cy.get('[href="/product_details/1"]').click();
    return this;
  }

  addToCart(productId: number) {
    this.productList.addToCart(productId);
    return this;
  }

  getProductPrice(productId: number) {
    return this.productList.getProductPrice(productId);
  }

  continueShopping() {
    this.productList.continueShopping();
    return this;
  }

  viewCart() {
    this.productList.viewCart();
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
    this.subscription.submit(email);
    return this;
  }

  assertSubscriptionSuccessMessageVisible() {
    this.subscription.assertSuccessMessageVisible();
    return this;
  }

  getFirstVisibleRecommendedProductId() {
    return this.productList.getFirstVisibleProductId('.carousel-inner .add-to-cart');
  }

  addToCartFirstVisibleRecommendedProduct(productId: number) {
    this.productList.addToCart(productId);
    return this;
  }

  scrollToBottom() {
    cy.scrollTo('bottom');
    return this;
  }

  assertSubscriptionVisible() {
    this.assertTextIsInViewport(/subscription/i, 'subscription');
    return this;
  }

  clickScrollUpArrow() {
    cy.get('#scrollUp').should('be.visible').click();
    return this;
  }

  scrollToTop() {
    cy.scrollTo('top');
    return this;
  }

  assertPageScrolledToTop() {
    cy.window().its('scrollY').should('be.lessThan', 100);
    return this;
  }

  assertHeroTextVisible() {
    this.assertTextIsInViewport(
      'Full-Fledged practice website for Automation Engineers',
      'hero text',
    );
    return this;
  }

  private assertTextIsInViewport(text: string | RegExp, label: string) {
    cy.contains<HTMLElement>('h1, h2, h3, p, span, a, button, label', text).should(($element) => {
      const element = $element.get(0);

      expect(element, `${label} element`).to.not.equal(undefined);

      if (!element) {
        throw new Error(`${label} element was not found`);
      }

      const rect = element.getBoundingClientRect();

      expect(rect.top, `${label} top edge`).to.be.lessThan(Cypress.config('viewportHeight'));
      expect(rect.bottom, `${label} bottom edge`).to.be.greaterThan(0);
      expect(rect.left, `${label} left edge`).to.be.lessThan(Cypress.config('viewportWidth'));
      expect(rect.right, `${label} right edge`).to.be.greaterThan(0);
    });
  }
}
