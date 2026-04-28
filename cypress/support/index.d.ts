// cypress/support/index.d.ts

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getByQa(value: string): Chainable<JQuery<HTMLElement>>;
      logStep(message: string): Chainable<null>;
      ensureAppDomain(): Chainable<void>;
    }
  }
}
