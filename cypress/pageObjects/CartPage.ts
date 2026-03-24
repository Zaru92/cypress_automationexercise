export class CartPage {
  assertCartPageVisible() {
    cy.url().should('include', 'view_cart');
    cy.contains('Shopping Cart').should('be.visible');
    return this;
  }

  proceedToCheckout() {
    cy.get('.check_out').click();
    return this;
  }

  goToAuthPage() {
    cy.get('#checkoutModal a').click();
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

  assertProductAddedToCartVisible(
    productId: number,
    expectedPrice: string,
    expectedQuantity: string,
  ) {
    const priceValue = Number(expectedPrice.replace(/[^\d.]/g, ''));
    const quantityValue = Number(expectedQuantity);
    const expectedTotalValue = priceValue * quantityValue;

    cy.get(`#product-${productId}`)
      .should('be.visible')
      .within(() => {
        cy.get('.cart_price').should('contain', expectedPrice);
        cy.get('.cart_quantity').should('contain', expectedQuantity);
        cy.get('.cart_total')
          .invoke('text')
          .then((text) => {
            const totalValue = Number(text.replace(/[^\d.]/g, ''));
            expect(totalValue).to.eq(expectedTotalValue);
          });
      });

    return this;
  }

  assertProductQuantity(quantity: Number) {
    cy.get('.cart_quantity')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq(String(quantity));
      });
    return this;
  }
}
