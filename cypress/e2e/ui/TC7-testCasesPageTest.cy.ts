import { HomePage } from '../../pageObjects/HomePage';
import { TestCasesPage } from '../../pageObjects/TestCasesPage';

describe('Regression | TC7: Test cases page navigation', () => {
  it('opens the test cases page from the home page', () => {
    const home = new HomePage();
    const testCases = new TestCasesPage();

    home.visit().assertLoaded().goToTestCasesPage();

    testCases.assertTestCasesPageVisible();
  });
});
