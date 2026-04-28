import './commands';
import 'cypress-mochawesome-reporter/register';

const getCurrentTestTitle = () => Cypress.currentTest.titlePath.join(' > ');

beforeEach(() => {
  cy.log(`[TEST START] ${getCurrentTestTitle()}`);
});

afterEach(function () {
  const testState = this.currentTest?.state ?? 'unknown';

  cy.log(`[TEST END] ${getCurrentTestTitle()} | ${testState}`);
});
