import { AuthPage } from '../../pageObjects/AuthPage';
import { HomePage } from '../../pageObjects/HomePage';

describe('Regression | "Test Case 3: Login User with incorrect email and password"', () => {
  it('logs in with incorrect credentials', () => {
    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterLoginEmail('test@test.test')
      .enterPassword('invalidPassword')
      .clickLoginButton()
      .assertInvalidLoginErrorMessageVisible();
  });
});
