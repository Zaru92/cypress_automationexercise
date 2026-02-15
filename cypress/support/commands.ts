// cypress/support/commands.ts

/**
 * Open Home page (baseUrl) and verify it's loaded.
 */
Cypress.Commands.add('openHome', () => {
  cy.visit('/');
  cy.get('body').should('be.visible');
});

/**
 * Open Products page and verify header.
 */
Cypress.Commands.add('openProducts', () => {
  cy.visit('/products');
  cy.get('#search_product').should('be.visible');
});

/**
 * Search product on Products page.
 * Assumes you are already on /products.
 */
Cypress.Commands.add('searchProduct', (query: string) => {
  cy.get('#search_product').should('be.visible').clear().type(query);
  cy.get('#submit_search').should('be.enabled').click();
  cy.contains(/Searched Products/i).should('be.visible');
});

/**
 * Add first visible product to cart.
 * Uses the "Add to cart" button for the first product card.
 */
Cypress.Commands.add('addFirstProductToCart', () => {
  // Many "Add to cart" buttons appear only on hover
  cy.get('.features_items .product-image-wrapper')
    .first()
    .within(() => {
      cy.get('.add-to-cart').first().click();
    });

  // Modal after adding
  cy.get('.modal-content').should('be.visible');
});

/**
 * Close the "Added to cart" modal (Continue Shopping).
 */
Cypress.Commands.add('continueShoppingFromModal', () => {
  cy.get('[data-dismiss="modal"]').click();
  cy.get('.modal-content').should('not.be.visible');
});
