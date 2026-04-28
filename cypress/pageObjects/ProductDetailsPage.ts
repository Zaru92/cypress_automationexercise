import type { ContactFormData } from '../testData/contactFactory';

export class ProductDetailsPage {
  assertProductDetailsPageVisible() {
    cy.logStep('Assert product details page is visible');
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
    cy.logStep('Assert product review form is visible');
    cy.get('#review-form').should('be.visible');
    return this;
  }

  setQuantity(quantity: number) {
    cy.logStep(`Set product quantity to ${quantity}`);
    cy.get('#quantity').clear();
    cy.get('#quantity').type(String(quantity));
    return this;
  }

  addToCart() {
    cy.logStep('Add product details item to cart');
    cy.get(`.cart`).first().click();
    return this;
  }

  openCartFromModal() {
    cy.logStep('Open cart from product details modal');
    cy.contains('View Cart').click();
    return this;
  }

  fillReviewForm(data: ContactFormData) {
    cy.logStep(`Fill product review form for ${data.email}`);

    cy.get('#name').clear();
    cy.get('#name').type(data.name);
    cy.get('#email').clear();
    cy.get('#email').type(data.email);
    cy.get('#review').clear();
    cy.get('#review').type(data.message);
    return this;
  }

  submitReview() {
    cy.logStep('Submit product review');
    cy.get('#button-review').click();
    return this;
  }

  assertSuccessMessageVisible() {
    cy.logStep('Assert product review success message is visible');
    cy.contains('Thank you for your review').should('be.visible');
    return this;
  }
}
