import type { User } from '../../testData/userFactory';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { AuthPage } from '../../pageObjects/AuthPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';

export const registerFromAuthPage = (user: User) => {
  const auth = new AuthPage();
  const signup = new SignupPage();
  const confirmation = new AccountCreationSuccessPage();

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

  return new HomePage().assertLoggedInAs(user.name);
};

export const registerUserViaUi = (user: User) => {
  new HomePage().visit().assertLoaded().goToSignupLoginPage();

  return registerFromAuthPage(user);
};

export const registerUserViaUiAndLogout = (user: User) => {
  const home = registerUserViaUi(user);

  home.logout();
  new AuthPage().assertLoginOrSignupPageVisible();

  return home;
};

export const loginFromAuthPage = (user: User) => {
  new AuthPage()
    .assertLoginOrSignupPageVisible()
    .enterLoginEmail(user.email)
    .enterPassword(user.password)
    .clickLoginButton();

  return new HomePage().assertLoggedInAs(user.name);
};

export const loginViaUi = (user: User) => {
  new HomePage().visit().assertLoaded().goToSignupLoginPage();

  return loginFromAuthPage(user);
};

export const logoutLoggedUserViaUi = (user: User) => {
  new HomePage().assertLoggedInAs(user.name).logout();
  return new AuthPage().assertLoginOrSignupPageVisible();
};

export const deleteLoggedUserViaUi = (user: User) =>
  new HomePage()
    .assertLoggedInAs(user.name)
    .deleteAccount()
    .continueAfterDeleted()
    .assertAccountDeleted(user.name);
