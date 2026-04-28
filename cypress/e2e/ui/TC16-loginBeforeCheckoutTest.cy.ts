import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';
import { createRandomContactMessage } from '../../testData/contactFactory';
import { createRandomPaymentDetails } from '../../testData/paymentFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { AuthPage } from '../../pageObjects/AuthPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';
import { PaymentPage } from '../../pageObjects/PaymentPage';
import { OrderPlacementSuccessPage } from '../../pageObjects/OrderPlacementSuccessPage';

describe('Regression | Test Case 16: Place Order: Login before Checkout', () => {
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

  it('logs in with correct credentials before placing order and deletes the account', () => {
    const data = createRandomContactMessage();
    const paymentData = createRandomPaymentDetails();

    const home = new HomePage();
    const auth = new AuthPage();
    const cart = new CartPage();
    const checkout = new CheckoutPage();
    const payment = new PaymentPage();
    const orderConfirmation = new OrderPlacementSuccessPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterLoginEmail(user.email)
      .enterPassword(user.password)
      .clickLoginButton();

    home
      .assertLoaded()
      .assertLoggedInAs(user.name)
      .addToCart(1)
      .continueShopping()
      .addToCart(2)
      .viewCart();

    cart.assertCartPageVisible().proceedToCheckout();

    checkout.assertCheckoutPageVisible().assertAddressDetails(user).fillForm(data).placeOrder();

    payment.assertPaymentPageVisible().fillForm(paymentData).submit();

    orderConfirmation.assertOrderPlaced().continueAfterPlacement();

    home.assertLoaded().deleteAccount().continueAfterDeleted().assertAccountDeleted(user.name);
  });
});
