import { HomePage } from '../../pageObjects/HomePage';
import { TestCasesPage } from '../../pageObjects/TestCasesPage';

describe('Regression | Test Case 7: Verify Test Cases Page', () => {
  it('open page with test cases', () => {
    const home = new HomePage();
    const testCases = new TestCasesPage();

    home.visit().assertLoaded().goToTestCasesPage();

    testCases.assertTestCasesPageVisible();
  });
});
