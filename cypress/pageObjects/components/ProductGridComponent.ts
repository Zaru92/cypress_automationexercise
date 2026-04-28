export class ProductGridComponent {
  addToCart(productId: number) {
    cy.get(`a[data-product-id="${productId}"]`).first().click();
    cy.contains('Added!').should('be.visible');
    return this;
  }

  continueShopping() {
    cy.get('.close-modal').click();
    return this;
  }

  openCartFromModal() {
    cy.contains('View Cart').should('be.visible').click();
    return this;
  }

  getProductPrice(productId: number) {
    return cy
      .get(`a[data-product-id="${productId}"]`)
      .first()
      .closest('.product-image-wrapper')
      .find('.productinfo h2')
      .invoke('text')
      .then((text) => text.trim());
  }

  getFirstVisibleProductId(selector: string) {
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
