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
    cy.logStep('Visit home page');
    cy.visit('/');

    return this;
  }

  assertLoaded() {
    cy.logStep('Assert home page is loaded');
    cy.get('body').should('be.visible');
    cy.get('#slider-carousel').should('be.visible');

    return this;
  }

  goToProductsPage() {
    cy.logStep('Navigate to products page');
    this.header.goToProductsPage();

    return this;
  }

  goToSignupLoginPage() {
    cy.logStep('Navigate to signup/login page');
    this.header.goToSignupLoginPage();

    return this;
  }

  goToCartPage() {
    cy.logStep('Navigate to cart page');
    this.header.goToCartPage();

    return this;
  }

  goToTestCasesPage() {
    cy.logStep('Navigate to test cases page');
    this.header.goToTestCasesPage();

    return this;
  }

  goToContactUsPage() {
    cy.logStep('Navigate to contact us page');
    this.header.goToContactUsPage();

    return this;
  }

  openCategoryProducts(category: string, subcategory: string) {
    cy.logStep(`Open category products: ${category} > ${subcategory}`);
    this.categorySidebar.openCategoryProducts(category, subcategory);

    return this;
  }

  openFirstProductDetails() {
    cy.logStep('Open first product details');
    this.productGrid.openProductDetails(1);

    return this;
  }

  addToCart(productId: number) {
    cy.logStep(`Add product ${productId} to cart from home page`);
    this.productGrid.addToCart(productId);

    return this;
  }

  getProductPrice(productId: number) {
    cy.logStep(`Get product ${productId} price from home page`);

    return this.productGrid.getProductPrice(productId);
  }

  continueShopping() {
    cy.logStep('Continue shopping from product modal');
    this.productGrid.continueShopping();

    return this;
  }

  openCartFromModal() {
    cy.logStep('Open cart from product modal');
    this.productGrid.openCartFromModal();

    return this;
  }

  assertLoggedInAs(name: string) {
    cy.logStep(`Assert user is logged in as ${name}`);
    this.header.assertLoggedInAs(name);

    return this;
  }

  deleteAccountAndAssertDeleted() {
    cy.logStep('Delete account and assert deletion message');
    this.header.deleteAccount();
    cy.contains('Account Deleted!').should('be.visible');

    return this;
  }

  continueAfterAccountDeletion() {
    cy.logStep('Continue after account deletion');
    clickQaField('continue-button');

    return this;
  }

  assertDeletedUserIsNotLoggedIn(name: string) {
    cy.logStep(`Assert deleted user is not logged in: ${name}`);
    this.header.assertLoggedOut(name);

    return this;
  }

  logout() {
    cy.logStep('Log out from home page');
    this.header.logout();

    return this;
  }

  submitSubscription(email: string) {
    cy.logStep(`Submit subscription from home page: ${email}`);
    this.subscriptionForm.subscribeWithEmail(email);

    return this;
  }

  assertSubscriptionSuccessMessageVisible() {
    cy.logStep('Assert subscription success message is visible');
    this.subscriptionForm.assertSuccessMessageVisible();

    return this;
  }

  getFirstVisibleRecommendedProductId() {
    cy.logStep('Get first visible recommended product id');

    return this.productGrid.getFirstVisibleProductId('.carousel-inner .add-to-cart');
  }

  addRecommendedProductToCart(productId: number) {
    cy.logStep(`Add recommended product ${productId} to cart`);
    this.productGrid.addToCart(productId);

    return this;
  }

  scrollToBottom() {
    cy.logStep('Scroll to page bottom');
    cy.scrollTo('bottom');

    return this;
  }

  assertSubscriptionVisible() {
    cy.logStep('Assert subscription section is visible');
    this.assertTextIsInViewport(/subscription/i, 'subscription');

    return this;
  }

  scrollToTopUsingArrow() {
    cy.logStep('Scroll to top using arrow button');
    cy.get('#scrollUp').should('be.visible').click();

    return this;
  }

  scrollToTop() {
    cy.logStep('Scroll to page top');
    cy.scrollTo('top');

    return this;
  }

  assertPageScrolledToTop() {
    cy.logStep('Assert page is scrolled to top');
    cy.window().its('scrollY').should('be.lessThan', 100);

    return this;
  }

  assertHeroTextVisible() {
    cy.logStep('Assert hero text is visible');
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
