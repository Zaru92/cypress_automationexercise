import { AuthPage } from '../../pageObjects/AuthPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { createRandomUser, User } from '../../testData/userFactory';

describe('Regression | "Test Case 4: Logout User"', () => {
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

  after(() => {
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

  it('logout current user', () => {
    const home = new HomePage();
    const auth = new AuthPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterLoginEmail(user.email)
      .enterPassword(user.password)
      .clickLoginButton();

    home.assertLoggedInAs(user.name).logout();

    auth.assertLoginOrSignupPageVisible();
  });
});
