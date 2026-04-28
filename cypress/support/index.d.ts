// cypress/support/index.d.ts

export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getByQa(value: string): Chainable<JQuery<HTMLElement>>;
      ensureAppDomain(): Chainable<void>;
    }
  }
}
