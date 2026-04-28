import { createRandomUser } from '../../testData/userFactory';

import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';

import { addProductsAndViewCart } from '../../support/flows/cartFlows';
import { deleteLoggedUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Regression | Test Case 23: Verify address details in checkout page', () => {
  it('register account before placing order and verify address details', () => {
    const user = createRandomUser();

    const cart = new CartPage();
    const checkout = new CheckoutPage();

    const home = registerUserViaUi(user);

    home.assertLoaded();
    addProductsAndViewCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout();

    checkout.assertCheckoutPageVisible().assertAddressDetails(user).assertBillingDetails(user);

    home.visit();
    deleteLoggedUserViaUi(user);
  });
});
