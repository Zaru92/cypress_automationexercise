import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';
import { createRandomContactFormData } from '../../testData/contactFactory';
import { createRandomCardPaymentDetails } from '../../testData/paymentFactory';

import { CartPage } from '../../pageObjects/CartPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import {
  deleteLoggedInUserViaUi,
  loginUserViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | Test Case 16: Place Order: Login before Checkout', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    registerUserViaUiAndLogout(user);
  });

  it('logs in with correct credentials before placing order and deletes the account', () => {
    const data = createRandomContactFormData();
    const paymentData = createRandomCardPaymentDetails();

    const cart = new CartPage();

    const home = loginUserViaUi(user);

    home.assertLoaded();
    addProductsToCartAndOpenCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout();

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedInUserViaUi(user);
  });
});
