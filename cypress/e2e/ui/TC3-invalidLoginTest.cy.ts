import { HomePage } from '../../pageObjects/HomePage';
import { LoginSignupPage } from '../../pageObjects/LoginSignupPage';

describe('Regression | TC3: Login with invalid credentials', () => {
  it('shows an invalid-login error for an unknown email and password', () => {
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
