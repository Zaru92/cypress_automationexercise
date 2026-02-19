import { AuthPage } from '../../pageObjects/AuthPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { createRandomUser, User } from '../../testData/userFactory';

describe('Regression | "Test Case 2: Login User with correct email and password"', () => {
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
  });

  it('logs in with correct credentials and deletes the account', () => {
    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth.enterLoginEmail(user.email).enterPassword(user.password).clickLoginButton();

    home
      .assertLoggedInAs(user.name)
      .deleteAccount()
      .continueAfterDeleted()
      .assertAccountDeleted(user.name);
  });
});
