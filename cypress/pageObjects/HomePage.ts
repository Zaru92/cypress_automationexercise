import { CategorySidebarComponent } from './components/CategorySidebarComponent';
import { clickQaField } from './components/FormControls';
import { HeaderComponent } from './components/HeaderComponent';
import { ProductGridComponent } from './components/ProductGridComponent';
import { SubscriptionComponent } from './components/SubscriptionComponent';

export class HomePage {
  private readonly categorySidebar = new CategorySidebarComponent();
  private readonly header = new HeaderComponent();
  private readonly productGrid = new ProductGridComponent();
  private readonly subscriptionForm = new SubscriptionComponent();

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
    this.header.goToProductsPage();
    return this;
  }

  goToSignupLoginPage() {
    this.header.goToSignupLoginPage();
    return this;
  }

  goToCartPage() {
    this.header.goToCartPage();
    return this;
  }

  goToTestCasesPage() {
    this.header.goToTestCasesPage();
    return this;
  }

  goToContactUsPage() {
    this.header.goToContactUsPage();
    return this;
  }

  openCategoryProducts(category: string, subcategory: string) {
    this.categorySidebar.openCategoryProducts(category, subcategory);
    return this;
  }

  openFirstProductDetails() {
    this.productGrid.openProductDetails(1);
    return this;
  }

  addToCart(productId: number) {
    this.productGrid.addToCart(productId);
    return this;
  }

  getProductPrice(productId: number) {
    return this.productGrid.getProductPrice(productId);
  }

  continueShopping() {
    this.productGrid.continueShopping();
    return this;
  }

  openCartFromModal() {
    this.productGrid.openCartFromModal();
    return this;
  }

  assertLoggedInAs(name: string) {
    this.header.assertLoggedInAs(name);
    return this;
  }

  deleteAccountAndAssertDeleted() {
    this.header.deleteAccount();
    cy.contains('Account Deleted!').should('be.visible');
    return this;
  }

  continueAfterAccountDeletion() {
    clickQaField('continue-button');
    return this;
  }

  assertDeletedUserIsNotLoggedIn(name: string) {
    this.header.assertLoggedOut(name);
    return this;
  }

  logout() {
    this.header.logout();
    return this;
  }

  submitSubscription(email: string) {
    this.subscriptionForm.subscribeWithEmail(email);
    return this;
  }

  assertSubscriptionSuccessMessageVisible() {
    this.subscriptionForm.assertSuccessMessageVisible();
    return this;
  }

  getFirstVisibleRecommendedProductId() {
    return this.productGrid.getFirstVisibleProductId('.carousel-inner .add-to-cart');
  }

  addRecommendedProductToCart(productId: number) {
    this.productGrid.addToCart(productId);
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

  scrollToTopUsingArrow() {
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
