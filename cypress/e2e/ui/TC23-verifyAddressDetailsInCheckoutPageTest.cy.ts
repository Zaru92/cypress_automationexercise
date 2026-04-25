import { createRandomUser } from '../../testData/userFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { AuthPage } from '../../pageObjects/AuthPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';

describe('Regression | Test Case 23: Verify address details in checkout page', () => {
  it('register account before placing order and verify address details', () => {
    const user = createRandomUser();

    const home = new HomePage();
    const auth = new AuthPage();
    const signup = new SignupPage();
    const confirmation = new AccountCreationSuccessPage();
    const cart = new CartPage();
    const checkout = new CheckoutPage();

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

    home
      .assertLoaded()
      .assertLoggedInAs(user.name)
      .addToCart(1)
      .continueShopping()
      .addToCart(2)
      .viewCart();

    cart.assertCartPageVisible().proceedToCheckout();

    checkout.assertCheckoutPageVisible().assertAddressDetails(user).assertBillingDetails(user);

    home
      .visit()
      .assertLoggedInAs(user.name)
      .deleteAccount()
      .continueAfterDeleted()
      .assertAccountDeleted(user.name);
  });
});
