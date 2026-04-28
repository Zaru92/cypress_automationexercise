import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';
import { createRandomContactMessage } from '../../testData/contactFactory';
import { createRandomPaymentDetails } from '../../testData/paymentFactory';

import { CartPage } from '../../pageObjects/CartPage';

import { addProductsAndViewCart } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import {
  deleteLoggedUserViaUi,
  loginViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | Test Case 16: Place Order: Login before Checkout', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    registerUserViaUiAndLogout(user);
  });

  it('logs in with correct credentials before placing order and deletes the account', () => {
    const data = createRandomContactMessage();
    const paymentData = createRandomPaymentDetails();

    const cart = new CartPage();

    const home = loginViaUi(user);

    home.assertLoaded();
    addProductsAndViewCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout();

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedUserViaUi(user);
  });
});
