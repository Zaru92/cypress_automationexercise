import { createRandomTestUser } from '../../testData/userFactory';
import { createRandomContactFormData } from '../../testData/contactFactory';
import { createRandomCardPaymentDetails } from '../../testData/paymentFactory';

import { HomePage } from '../../pageObjects/HomePage';

import { addProductsToCartAndOpenSignupFromCheckout } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import {
  deleteLoggedInUserViaUi,
  registerUserFromCheckoutAndProceedToCheckout,
} from '../../support/flows/userFlows';

describe('Regression | TC14: Register during checkout and place order', () => {
  it('adds products, registers from the checkout modal, places an order, and deletes the account', () => {
    const user = createRandomTestUser();
    const data = createRandomContactFormData();
    const paymentData = createRandomCardPaymentDetails();

    const home = new HomePage();

    home.visit().assertLoaded();
    addProductsToCartAndOpenSignupFromCheckout(home, [1, 2]);
    registerUserFromCheckoutAndProceedToCheckout(user);

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedInUserViaUi(user);
  });
});
