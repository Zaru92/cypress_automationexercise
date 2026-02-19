// cypress/support/commands.ts

Cypress.Commands.add('getByQa', (value: string) => cy.get(`[data-qa='${value}']`));

Cypress.Commands.add('ensureAppDomain', () => {
  cy.location('host').then((host) => {
    if (!host.includes('automationexercise.com')) cy.visit('/');
  });
});
