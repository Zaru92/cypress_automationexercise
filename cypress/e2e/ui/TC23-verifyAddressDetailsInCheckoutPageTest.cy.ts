import { createRandomTestUser } from '../../testData/userFactory';

import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';
import { deleteLoggedInUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Regression | Test Case 23: Verify address details in checkout page', () => {
  it('register account before placing order and verify address details', () => {
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
