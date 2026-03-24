import { HomePage } from '../../pageObjects/HomePage';
import { AuthPage } from '../../pageObjects/AuthPage';

describe('Regression | "Test Case 3: Login User with incorrect email and password"', () => {
  it('logs in with incorrect credentials', () => {
    const invalidEmail = 'test@test.test';
    const invalidPassword = 'invalidPassword';

    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterLoginEmail(invalidEmail)
      .enterPassword(invalidPassword)
      .clickLoginButton()
      .assertInvalidLoginErrorMessageVisible();
  });
});
