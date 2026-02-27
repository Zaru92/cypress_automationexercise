import { AuthPage } from '../../pageObjects/AuthPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { createRandomUser, User } from '../../testData/userFactory';

describe('Regression | "Test Case 3: Login User with incorrect email and password"', () => {
  let user: User;

  it('logs in with incorrect credentials', () => {
    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterLoginEmail('test@test.test')
      .enterPassword('invalidPassword')
      .clickLoginButton()
      .assertErrorMessageVisible();
  });
});
