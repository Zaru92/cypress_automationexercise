import type { TestUser } from '../../testData/userFactory';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { CartPage } from '../../pageObjects/CartPage';
import { LoginSignupPage } from '../../pageObjects/LoginSignupPage';
import { HomePage } from '../../pageObjects/HomePage';
import { SignupPage } from '../../pageObjects/SignupPage';

export const registerUserFromLoginSignupPage = (user: TestUser) => {
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
  new HomePage().visit().assertLoaded().goToSignupLoginPage();

  return registerUserFromLoginSignupPage(user);
};

export const registerUserViaUiAndLogout = (user: TestUser) => {
  const home = registerUserViaUi(user);

  home.logout();
  new LoginSignupPage().assertLoginSignupPageVisible();

  return home;
};

export const registerUserFromCheckoutAndProceedToCheckout = (user: TestUser) => {
  registerUserFromLoginSignupPage(user).assertLoaded().goToCartPage();

  return new CartPage().assertCartPageVisible().proceedToCheckout();
};

export const loginUserFromLoginSignupPage = (user: TestUser) => {
  new LoginSignupPage()
    .assertLoginSignupPageVisible()
    .enterLoginEmail(user.email)
    .enterLoginPassword(user.password)
    .submitLogin();

  return new HomePage().assertLoggedInAs(user.name);
};

export const loginUserViaUi = (user: TestUser) => {
  new HomePage().visit().assertLoaded().goToSignupLoginPage();

  return loginUserFromLoginSignupPage(user);
};

export const logoutCurrentUserViaUi = (user: TestUser) => {
  new HomePage().assertLoggedInAs(user.name).logout();
  return new LoginSignupPage().assertLoginSignupPageVisible();
};

export const deleteLoggedInUserViaUi = (user: TestUser) =>
  new HomePage()
    .assertLoggedInAs(user.name)
    .deleteAccountAndAssertDeleted()
    .continueAfterAccountDeletion()
    .assertDeletedUserIsNotLoggedIn(user.name);
