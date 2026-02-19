import { createRandomUser } from '../../testData/userFactory';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { AuthPage } from '../../pageObjects/AuthPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';

describe('Regression | "Test Case 1: Register User"', () => {
  it('registers a new user and deletes the account', () => {
    const user = createRandomUser();

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

    home
      .assertLoggedInAs(user.name)
      .deleteAccount()
      .continueAfterDeleted()
      .assertAccountDeleted(user.name);
  });
});
