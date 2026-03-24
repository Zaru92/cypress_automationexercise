import { createRandomUser } from '../../testData/userFactory';
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

describe('Regression | Test Case 15: Place Order: Register before Checkout', () => {
  it('register account before placing order', () => {
    const user = createRandomUser();
    const data = createRandomContactMessage();
    const paymentData = createRandomPaymentDetails();

    const home = new HomePage();
    const auth = new AuthPage();
    const signup = new SignupPage();
    const confirmation = new AccountCreationSuccessPage();
    const cart = new CartPage();
    const checkout = new CheckoutPage();
    const payment = new PaymentPage();
    const orderConfirmation = new OrderPlacementSuccessPage();

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

    checkout.assertCheckoutPageVisible().assertAddressDetails(user).fillForm(data).placeOrder();

    payment.assertPaymentPageVisible().fillForm(paymentData).submit();

    orderConfirmation.assertOrderPlaced().continueAfterPlacement();

    home.assertLoaded().deleteAccount().continueAfterDeleted().assertAccountDeleted(user.name);
  });
});
