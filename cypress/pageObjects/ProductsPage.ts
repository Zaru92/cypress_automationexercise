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
}
