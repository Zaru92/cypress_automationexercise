import { CategorySidebarComponent } from './components/CategorySidebarComponent';
import { ProductGridComponent } from './components/ProductGridComponent';

export class ProductsPage {
  private readonly categorySidebar = new CategorySidebarComponent();
  private readonly productGrid = new ProductGridComponent();

  assertProductsPageVisible() {
    cy.logStep('Assert products page is visible');
    cy.url().should('include', 'products');
    cy.contains('All Products').should('be.visible');
    return this;
  }

  openFirstProductDetails() {
    cy.logStep('Open first product details from products page');
    this.productGrid.openProductDetails(1);
    return this;
  }

  openCategoryProducts(category: string, subcategory: string) {
    cy.logStep(`Open category products from products page: ${category} > ${subcategory}`);
    this.categorySidebar.openCategoryProducts(category, subcategory);
    return this;
  }

  openBrandProducts(brand: string) {
    cy.logStep(`Open brand products: ${brand}`);
    cy.get('.brands_products').should('be.visible');
    cy.contains('.brands_products a', brand).click();
    return this;
  }

  getFirstVisibleProductId() {
    cy.logStep('Get first visible product id from products page');
    return this.productGrid.getFirstVisibleProductId(
      '.features_items a.add-to-cart[data-product-id]:visible',
    );
  }

  addToCart(productId: number) {
    cy.logStep(`Add product ${productId} to cart from products page`);
    this.productGrid.addToCart(productId);
    return this;
  }

  continueShopping() {
    cy.logStep('Continue shopping from products page modal');
    this.productGrid.continueShopping();
    return this;
  }

  openCartFromModal() {
    cy.logStep('Open cart from products page modal');
    this.productGrid.openCartFromModal();
    return this;
  }

  getProductPrice(productId: number) {
    cy.logStep(`Get product ${productId} price from products page`);
    return this.productGrid.getProductPrice(productId);
  }

  searchProduct(productName: string) {
    cy.logStep(`Search product: ${productName}`);
    cy.get('#search_product').clear();
    cy.get('#search_product').type(productName);
    cy.get('#submit_search').click();
    return this;
  }

  assertSearchResultsContainProduct(query: string) {
    cy.logStep(`Assert search results contain product query: ${query}`);
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
    cy.logStep('Assert category page is visible');
    cy.url().should('include', 'category_products');
    return this;
  }

  assertCategoryProductsHeadingVisible(category: string, subcategory: string) {
    cy.logStep(`Assert category heading is visible: ${category} > ${subcategory}`);
    cy.contains(`${category} - ${subcategory} Products`).should('be.visible');
    return this;
  }

  assertBrandProductsPageVisible(brand: string) {
    cy.logStep(`Assert brand products page is visible: ${brand}`);
    cy.location('pathname').should((pathname) => {
      expect(decodeURIComponent(pathname)).to.eq(`/brand_products/${brand}`);
    });
    cy.contains(`Brand - ${brand} Products`).should('be.visible');
    return this;
  }
}
