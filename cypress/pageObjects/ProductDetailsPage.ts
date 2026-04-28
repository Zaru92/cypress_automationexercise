import type { ContactFormData } from '../testData/contactFactory';

export class ProductDetailsPage {
  assertProductDetailsPageVisible() {
    cy.url().should('include', 'product_details');
    cy.get('.product-information').should('be.visible');
    cy.get('h2').should('be.visible').and('not.be.empty');
    cy.contains('Category:').should('be.visible');
    cy.contains('Rs.').should('be.visible');
    cy.contains('Availability:').should('be.visible');
    cy.contains('Condition:').should('be.visible');
    cy.contains('Brand:').should('be.visible');
    return this;
  }

  assertReviewFormVisible() {
    cy.get('#review-form').should('be.visible');
    return this;
  }

  setQuantity(quantity: number) {
    cy.get('#quantity').clear();
    cy.get('#quantity').type(String(quantity));
    return this;
  }

  addToCart() {
    cy.get(`.cart`).first().click();
    return this;
  }

  openCartFromModal() {
    cy.contains('View Cart').click();
    return this;
  }

  fillReviewForm(data: ContactFormData) {
    cy.get('#name').clear();
    cy.get('#name').type(data.name);
    cy.get('#email').clear();
    cy.get('#email').type(data.email);
    cy.get('#review').clear();
    cy.get('#review').type(data.message);
    return this;
  }

  submitReview() {
    cy.get('#button-review').click();
    return this;
  }

  assertSuccessMessageVisible() {
    cy.contains('Thank you for your review').should('be.visible');
    return this;
  }
}
