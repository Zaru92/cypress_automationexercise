export class CategorySidebarComponent {
  openCategoryProducts(category: string, subcategory: string) {
    cy.get('#accordian').should('be.visible');
    cy.get(`#accordian a[href="#${category}"]`).click();
    cy.contains(`#${category} a`, subcategory).click();
    return this;
  }
}
