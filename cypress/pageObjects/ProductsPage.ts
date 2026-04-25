import type { getSearchQuery } from '../testData/productSearchFactory';

export class ProductsPage {
  assertProductsPageVisible() {
    cy.url().should('include', 'products');
    cy.contains('All Products').should('be.visible');
    return this;
  }

  viewFirstProduct() {
    cy.get('[href="/product_details/1"]').click();
    return this;
  }

  viewCategory(category: string, subcategory: string) {
    cy.get('#accordian').should('be.visible');
    cy.get(`#accordian a[href="#${category}"]`).click();
    cy.contains(`#${category} a`, subcategory).click();
    return this;
  }

  viewBrand(brand: string) {
    cy.get('.brands_products').should('be.visible');
    cy.contains('.brands_products a', brand).click();
    return this;
  }

  getFirstVisibleProductId() {
    return cy
      .get('.features_items a.add-to-cart[data-product-id]:visible')
      .first()
      .invoke('attr', 'data-product-id')
      .then((productId) => {
        expect(productId, 'first visible product id').to.exist;
        return Number(productId);
      });
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

  getProductPrice(productId: number) {
    return cy
      .get(`a[data-product-id="${productId}"]`)
      .first()
      .closest('.product-image-wrapper')
      .find('.productinfo h2')
      .invoke('text')
      .then((text) => text.trim());
  }

  searchProduct(productName: string) {
    cy.get('#search_product').click().clear().type(productName);
    cy.get('#submit_search').click();
    return this;
  }

  assertSearchedProductVisible(query: string) {
    const q = query.trim().toLowerCase();

    cy.get('.features_items .productinfo p')
      .filter(':visible')
      .then(($names) => {
        const names = $names.toArray().map((el) => (el.textContent ?? '').trim().toLowerCase());

        const matches = names.filter((t) => t.includes(q));
        expect(matches.length, `at least 1 product name should include "${q}"`).to.be.greaterThan(
          0,
        );
      });
    return this;
  }

  assertCategoryPageVisible() {
    cy.url().should('include', 'category_products');
    return this;
  }

  assertProperCategoryVisible(category: string, subcategory: string) {
    cy.contains(`${category} - ${subcategory} Products`).should('be.visible');
    return this;
  }

  assertProperBrandVisible(brand: string) {
    cy.location('pathname').should((pathname) => {
      expect(decodeURIComponent(pathname)).to.eq(`/brand_products/${brand}`);
    });
    cy.contains(`Brand - ${brand} Products`).should('be.visible');
    return this;
  }
}
