import { HomePage } from '../../pageObjects/HomePage';
import { LoginSignupPage } from '../../pageObjects/LoginSignupPage';

describe('Regression | "Test Case 5: Register User with existing email"', () => {
  it('registers a new user with existing email and verify error message is displayed', () => {
    const userName = 'test';
    const userEmail = 'test@test.test';

    const home = new HomePage();
    const auth = new LoginSignupPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginSignupPageVisible()
      .enterSignupName(userName)
      .enterSignupEmail(userEmail)
      .submitSignup()
      .assertExistingEmailSignupErrorVisible();
  });
});
