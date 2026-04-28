import { HeaderComponent } from './components/HeaderComponent';
import { SubscriptionComponent } from './components/SubscriptionComponent';

type ExpectedCartProduct = {
  productId: number;
  expectedPrice?: string;
  expectedQuantity?: string;
};

export class CartPage {
  private readonly header = new HeaderComponent();
  private readonly subscriptionForm = new SubscriptionComponent();

  assertCartPageVisible() {
    cy.logStep('Assert cart page is visible');
    cy.url().should('include', 'view_cart');
    cy.contains('Shopping Cart').should('be.visible');
    return this;
  }

  proceedToCheckout() {
    cy.logStep('Proceed to checkout from cart');
    cy.get('.check_out').click();
    return this;
  }

  removeProduct(productId: number) {
    cy.logStep(`Remove product ${productId} from cart`);
    cy.get(`#product-${productId}`).find('.cart_quantity_delete').click();
    return this;
  }

  goToLoginSignupPageFromCheckoutModal() {
    cy.logStep('Go to signup/login page from checkout modal');
    cy.get('#checkoutModal a').click();
    return this;
  }

  submitSubscription(email: string) {
    cy.logStep(`Submit subscription from cart page: ${email}`);
    this.subscriptionForm.subscribeWithEmail(email);
    return this;
  }

  goToSignupLoginPage() {
    cy.logStep('Navigate to signup/login page from cart');
    this.header.goToSignupLoginPage();
    return this;
  }

  goToHomePage() {
    cy.logStep('Navigate to home page from cart');
    cy.get('.logo').click();
    return this;
  }

  assertSubscriptionSuccessMessageVisible() {
    cy.logStep('Assert cart subscription success message is visible');
    this.subscriptionForm.assertSuccessMessageVisible();
    return this;
  }

  assertProductAddedToCartVisible(
    productId: number,
    expectedPrice?: string,
    expectedQuantity?: string,
  ) {
    cy.logStep(`Assert product ${productId} is visible in cart`);
    cy.get(`#product-${productId}`)
      .should('be.visible')
      .within(() => {
        if (expectedPrice !== undefined) {
          cy.get('.cart_price').should('contain', expectedPrice);
        }

        if (expectedQuantity !== undefined) {
          cy.get('.cart_quantity').should('contain', expectedQuantity);
        }

        if (expectedPrice !== undefined && expectedQuantity !== undefined) {
          const priceValue = Number(expectedPrice.replace(/[^\d.]/g, ''));
          const quantityValue = Number(expectedQuantity);
          const expectedTotalValue = priceValue * quantityValue;

          cy.get('.cart_total')
            .invoke('text')
            .then((text) => {
              const totalValue = Number(text.replace(/[^\d.]/g, ''));
              expect(totalValue).to.eq(expectedTotalValue);
            });
        }
      });

    return this;
  }

  assertProductsAddedToCartVisible(products: ExpectedCartProduct[]) {
    cy.logStep(
      `Assert products are visible in cart: ${products.map(({ productId }) => productId).join(', ')}`,
    );

    products.forEach(({ productId, expectedPrice, expectedQuantity }) => {
      this.assertProductAddedToCartVisible(productId, expectedPrice, expectedQuantity);
    });

    return this;
  }

  assertProductQuantity(quantity: number) {
    cy.logStep(`Assert cart product quantity equals ${quantity}`);
    cy.get('.cart_quantity')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq(String(quantity));
      });
    return this;
  }

  assertCartIsEmpty() {
    cy.logStep('Assert cart is empty');
    cy.contains('Cart is empty! Click here to buy products.').should('be.visible');
    return this;
  }
}
