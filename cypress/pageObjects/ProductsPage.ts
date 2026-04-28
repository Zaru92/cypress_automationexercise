import { CategorySidebarComponent } from './components/CategorySidebarComponent';
import { ProductGridComponent } from './components/ProductGridComponent';

export class ProductsPage {
  private readonly categorySidebar = new CategorySidebarComponent();
  private readonly productGrid = new ProductGridComponent();

  assertProductsPageVisible() {
    cy.url().should('include', 'products');
    cy.contains('All Products').should('be.visible');
    return this;
  }

  openFirstProductDetails() {
    this.productGrid.openProductDetails(1);
    return this;
  }

  openCategoryProducts(category: string, subcategory: string) {
    this.categorySidebar.openCategoryProducts(category, subcategory);
    return this;
  }

  openBrandProducts(brand: string) {
    cy.get('.brands_products').should('be.visible');
    cy.contains('.brands_products a', brand).click();
    return this;
  }

  getFirstVisibleProductId() {
    return this.productGrid.getFirstVisibleProductId(
      '.features_items a.add-to-cart[data-product-id]:visible',
    );
  }

  addToCart(productId: number) {
    this.productGrid.addToCart(productId);
    return this;
  }

  continueShopping() {
    this.productGrid.continueShopping();
    return this;
  }

  openCartFromModal() {
    this.productGrid.openCartFromModal();
    return this;
  }

  getProductPrice(productId: number) {
    return this.productGrid.getProductPrice(productId);
  }

  searchProduct(productName: string) {
    cy.get('#search_product').clear();
    cy.get('#search_product').type(productName);
    cy.get('#submit_search').click();
    return this;
  }

  assertSearchResultsContainProduct(query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    cy.get('.features_items .productinfo p')
      .filter(':visible')
      .then(($names) => {
        const productNames = $names
          .toArray()
          .map((element) => (element.textContent ?? '').trim().toLowerCase());

        const matchingProductNames = productNames.filter((productName) =>
          productName.includes(normalizedQuery),
        );
        expect(
          matchingProductNames.length,
          `at least 1 product name should include "${normalizedQuery}"`,
        ).to.be.greaterThan(0);
      });
    return this;
  }

  assertCategoryPageVisible() {
    cy.url().should('include', 'category_products');
    return this;
  }

  assertCategoryProductsHeadingVisible(category: string, subcategory: string) {
    cy.contains(`${category} - ${subcategory} Products`).should('be.visible');
    return this;
  }

  assertBrandProductsPageVisible(brand: string) {
    cy.location('pathname').should((pathname) => {
      expect(decodeURIComponent(pathname)).to.eq(`/brand_products/${brand}`);
    });
    cy.contains(`Brand - ${brand} Products`).should('be.visible');
    return this;
  }
}
