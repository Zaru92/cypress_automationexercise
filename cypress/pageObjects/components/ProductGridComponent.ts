export class ProductGridComponent {
  openProductDetails(productId: number) {
    cy.logStep(`Click product ${productId} details link`);
    cy.get(`[href="/product_details/${productId}"]`).click();
    return this;
  }

  addToCart(productId: number) {
    cy.logStep(`Click add to cart for product ${productId}`);
    cy.get(`a[data-product-id="${productId}"]`).first().click();
    cy.contains('Added!').should('be.visible');
    return this;
  }

  continueShopping() {
    cy.logStep('Click Continue Shopping in product modal');
    cy.get('.close-modal').click();
    return this;
  }

  openCartFromModal() {
    cy.logStep('Click View Cart in product modal');
    cy.contains('View Cart').should('be.visible').click();
    return this;
  }

  getProductPrice(productId: number) {
    cy.logStep(`Read product ${productId} price`);
    return cy
      .get(`a[data-product-id="${productId}"]`)
      .first()
      .closest('.product-image-wrapper')
      .find('.productinfo h2')
      .invoke('text')
      .then((text) => text.trim());
  }

  getFirstVisibleProductId(selector: string) {
    cy.logStep(`Read first visible product id using selector: ${selector}`);
    return cy
      .get(selector)
      .first()
      .invoke('attr', 'data-product-id')
      .then((productId) => {
        expect(productId, 'first visible product id').to.be.a('string');
        return Number(productId);
      });
  }
}
