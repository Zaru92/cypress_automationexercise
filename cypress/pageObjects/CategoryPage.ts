export class CategoryPage {
  assertCategoryPageVisible() {
    cy.url().should('include', 'category_products');
    return this;
  }

  assertProperCategoryVisible(category: string, subcategory: string) {
    cy.contains(`${category}`).should('be.visible');
    cy.contains(`${subcategory}`).should('be.visible');
    return this;
  }

  viewCategory(category: string, subcategory: string) {
    cy.get('#accordian').should('be.visible');
    cy.get(`#accordian a[href="#${category}"]`).click();
    cy.contains(`#${category} a`, subcategory).click();
    return this;
  }
}
