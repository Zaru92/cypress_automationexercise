import { createRandomUser, User } from '../../testData/userFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { AuthPage } from '../../pageObjects/AuthPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';

describe('Smoke | "Test Case 2: Login User with correct email and password"', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    const home = new HomePage();
    const auth = new AuthPage();
    const signup = new SignupPage();
    const confirmation = new AccountCreationSuccessPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterSignupName(user.name)
      .enterSignupEmail(user.email)
      .clickSignupButton();

    signup
      .assertSignupFormVisible()
      .fillAccountInformation(user)
      .selectNewsletterAndOffers()
      .fillAddressDetails(user)
      .confirmAccountCreation();

    confirmation.assertAccountCreated().continueAfterCreation();

    cy.ensureAppDomain();

    home.logout();

    auth.assertLoginOrSignupPageVisible();
  });

  it('logs in with correct credentials and deletes the account', () => {
    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterLoginEmail(user.email)
      .enterPassword(user.password)
      .clickLoginButton();

    home
      .assertLoggedInAs(user.name)
      .deleteAccount()
      .continueAfterDeleted()
      .assertAccountDeleted(user.name);
  });
});
