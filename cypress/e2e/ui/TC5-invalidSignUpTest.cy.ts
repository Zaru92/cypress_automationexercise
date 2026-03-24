import { HomePage } from '../../pageObjects/HomePage';
import { AuthPage } from '../../pageObjects/AuthPage';

describe('Regression | "Test Case 5: Register User with existing email"', () => {
  it('registers a new user with existing email and verify error message is displayed', () => {
    const userName = 'test';
    const userEmail = 'test@test.test';

    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterSignupName(userName)
      .enterSignupEmail(userEmail)
      .clickSignupButton()
      .assertInvalidSignUpErrorMessageVisible();
  });
});
