import type { TestUser } from '../../testData/userFactory';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { CartPage } from '../../pageObjects/CartPage';
import { LoginSignupPage } from '../../pageObjects/LoginSignupPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';

export const registerUserFromLoginSignupPage = (user: TestUser) => {
  cy.logStep(`Register user from signup form: ${user.email}`);

  const loginSignup = new LoginSignupPage();
  const signup = new SignupPage();
  const accountCreated = new AccountCreatedPage();

  loginSignup
    .assertLoginSignupPageVisible()
    .enterSignupName(user.name)
    .enterSignupEmail(user.email)
    .submitSignup();

  signup
    .assertSignupFormVisible()
    .fillAccountInformation(user)
    .selectNewsletterAndOffers()
    .fillAddressDetails(user)
    .confirmAccountCreation();

  accountCreated.assertAccountCreated().continueAfterCreation();

  cy.ensureAppDomain();

  return new HomePage().assertLoggedInAs(user.name);
};

export const registerUserViaUi = (user: TestUser) => {
  cy.logStep(`Open signup flow for user: ${user.email}`);

  new HomePage().visit().assertLoaded().goToSignupLoginPage();

  return registerUserFromLoginSignupPage(user);
};

export const registerUserViaUiAndLogout = (user: TestUser) => {
  cy.logStep(`Register user and log out: ${user.email}`);

  const home = registerUserViaUi(user);

  home.logout();
  new LoginSignupPage().assertLoginSignupPageVisible();

  return home;
};

export const registerUserFromCheckoutAndProceedToCheckout = (user: TestUser) => {
  cy.logStep(`Register user from checkout and continue checkout: ${user.email}`);

  registerUserFromLoginSignupPage(user).assertLoaded().goToCartPage();

  return new CartPage().assertCartPageVisible().proceedToCheckout();
};

export const loginUserFromLoginSignupPage = (user: TestUser) => {
  cy.logStep(`Log in from login form: ${user.email}`);

  new LoginSignupPage()
    .assertLoginSignupPageVisible()
    .enterLoginEmail(user.email)
    .enterLoginPassword(user.password)
    .submitLogin();

  return new HomePage().assertLoggedInAs(user.name);
};

export const loginUserViaUi = (user: TestUser) => {
  cy.logStep(`Open login flow for user: ${user.email}`);

  new HomePage().visit().assertLoaded().goToSignupLoginPage();

  return loginUserFromLoginSignupPage(user);
};

export const logoutCurrentUserViaUi = (user: TestUser) => {
  cy.logStep(`Log out current user: ${user.email}`);

  new HomePage().assertLoggedInAs(user.name).logout();
  return new LoginSignupPage().assertLoginSignupPageVisible();
};

export const deleteLoggedInUserViaUi = (user: TestUser) => {
  cy.logStep(`Delete logged-in user account: ${user.email}`);

  return new HomePage()
    .assertLoggedInAs(user.name)
    .deleteAccountAndAssertDeleted()
    .continueAfterAccountDeletion()
    .assertDeletedUserIsNotLoggedIn(user.name);
};
