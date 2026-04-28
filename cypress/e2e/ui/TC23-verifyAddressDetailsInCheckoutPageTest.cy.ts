import { createRandomTestUser } from '../../testData/userFactory';

import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';
import { deleteLoggedInUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Regression | TC23: Checkout address details', () => {
  it('registers a user, starts checkout, and verifies delivery and billing addresses', () => {
    const user = createRandomTestUser();

    const cart = new CartPage();
    const checkout = new CheckoutPage();

    const home = registerUserViaUi(user);

    home.assertLoaded();
    addProductsToCartAndOpenCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout();

    checkout
      .assertCheckoutPageVisible()
      .assertDeliveryAddressDetails(user)
      .assertBillingAddressDetails(user);

    home.visit();
    deleteLoggedInUserViaUi(user);
  });
});
