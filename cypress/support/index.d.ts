// cypress/support/index.d.ts
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      openHome(): Chainable<void>;
      openProducts(): Chainable<void>;
      searchProduct(query: string): Chainable<void>;
      addFirstProductToCart(): Chainable<void>;
      continueShoppingFromModal(): Chainable<void>;
    }
  }
}
