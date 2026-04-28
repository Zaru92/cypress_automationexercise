import { HomePage } from '../../pageObjects/HomePage';
import { LoginSignupPage } from '../../pageObjects/LoginSignupPage';

describe('Regression | "Test Case 3: Login User with incorrect email and password"', () => {
  it('logs in with incorrect credentials', () => {
    const invalidEmail = 'test@test.test';
    const invalidPassword = 'invalidPassword';

    const home = new HomePage();
    const auth = new LoginSignupPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginSignupPageVisible()
      .enterLoginEmail(invalidEmail)
      .enterLoginPassword(invalidPassword)
      .submitLogin()
      .assertInvalidLoginErrorMessageVisible();
  });
});
