import { createRandomUser } from '../../testData/userFactory';
import { createRandomContactMessage } from '../../testData/contactFactory';
import { createRandomPaymentDetails } from '../../testData/paymentFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';
import { AuthPage } from '../../pageObjects/AuthPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';
import { PaymentPage } from '../../pageObjects/PaymentPage';
import { OrderPlacementSuccessPage } from '../../pageObjects/OrderPlacementSuccessPage';

describe('Regression | Test Case 14: Place Order: Register while Checkout', () => {
  it('register account during placing order', () => {
    const user = createRandomUser();
    const data = createRandomContactMessage();
    const paymentData = createRandomPaymentDetails();

    const home = new HomePage();
    const cart = new CartPage();
    const auth = new AuthPage();
    const signup = new SignupPage();
    const confirmation = new AccountCreationSuccessPage();
    const checkout = new CheckoutPage();
    const payment = new PaymentPage();
    const orderConfirmation = new OrderPlacementSuccessPage();

    home.visit().assertLoaded().addToCart(1).continueShopping().addToCart(2).viewCart();

    cart.assertCartPageVisible().proceedToCheckout().goToAuthPage();

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

    home.assertLoaded().assertLoggedInAs(user.name).goToCartPage();

    cart.assertCartPageVisible().proceedToCheckout();

    checkout.assertCheckoutPageVisible().assertAddressDetails(user).fillForm(data).placeOrder();

    payment.assertPaymentPageVisible().fillForm(paymentData).submit();

    orderConfirmation.assertOrderPlaced().continueAfterPlacement();

    home.assertLoaded().deleteAccount().continueAfterDeleted().assertAccountDeleted(user.name);
  });
});
