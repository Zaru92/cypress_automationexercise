import { CategoryMenuComponent } from './components/CategoryMenuComponent';
import { ProductListComponent } from './components/ProductListComponent';

export class ProductsPage {
  private readonly categoryMenu = new CategoryMenuComponent();
  private readonly productList = new ProductListComponent();

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
    this.categoryMenu.viewCategory(category, subcategory);
    return this;
  }

  viewBrand(brand: string) {
    cy.get('.brands_products').should('be.visible');
    cy.contains('.brands_products a', brand).click();
    return this;
  }

  getFirstVisibleProductId() {
    return this.productList.getFirstVisibleProductId(
      '.features_items a.add-to-cart[data-product-id]:visible',
    );
  }

  addToCart(productId: number) {
    this.productList.addToCart(productId);
    return this;
  }

  continueShopping() {
    this.productList.continueShopping();
    return this;
  }

  viewCart() {
    this.productList.viewCart();
    return this;
  }

  getProductPrice(productId: number) {
    return this.productList.getProductPrice(productId);
  }

  searchProduct(productName: string) {
    cy.get('#search_product').clear();
    cy.get('#search_product').type(productName);
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
