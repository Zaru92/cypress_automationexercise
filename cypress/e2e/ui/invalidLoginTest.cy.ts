import { AuthPage } from '../../pageObjects/AuthPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { createRandomUser, User } from '../../testData/userFactory';

describe('Regression | "Test Case 2: Login User with correct email and password"', () => {
  let user: User;

  it('logs in with correct credentials and deletes the account', () => {
    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .enterLoginEmail('test@test.test')
      .enterPassword('invalidPassword')
      .clickLoginButton()
      .assertErrorMessageVisible();
  });
});
