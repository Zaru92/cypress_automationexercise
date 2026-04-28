import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';
import { createRandomContactFormData } from '../../testData/contactFactory';
import { createRandomCardPaymentDetails } from '../../testData/paymentFactory';

import { addProductsToCartAndProceedToCheckout } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import {
  deleteLoggedInUserViaUi,
  loginUserViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | TC16: Login before checkout and place order', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    registerUserViaUiAndLogout(user);
  });

  it('logs in, adds products, places an order, and deletes the account', () => {
    const data = createRandomContactFormData();
    const paymentData = createRandomCardPaymentDetails();

    const home = loginUserViaUi(user);

    home.assertLoaded();
    addProductsToCartAndProceedToCheckout(home, [1, 2]);

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedInUserViaUi(user);
  });
});
