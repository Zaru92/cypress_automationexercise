import { createRandomTestUser } from '../../testData/userFactory';
import { createRandomContactFormData } from '../../testData/contactFactory';
import { createRandomCardPaymentDetails } from '../../testData/paymentFactory';

import { HomePage } from '../../pageObjects/HomePage';

import { addProductsToCartAndOpenSignupFromCheckout } from '../../support/flows/cartFlows';
import { placeOrderAndDownloadInvoice } from '../../support/flows/orderFlows';
import {
  deleteLoggedInUserViaUi,
  registerUserFromCheckoutAndProceedToCheckout,
} from '../../support/flows/userFlows';

describe('Regression | TC24: Invoice download after order', () => {
  it('adds products, registers during checkout, places an order, downloads the invoice, and deletes the account', () => {
    const user = createRandomTestUser();
    const data = createRandomContactFormData();
    const paymentData = createRandomCardPaymentDetails();

    const home = new HomePage();

    home.visit().assertLoaded();
    addProductsToCartAndOpenSignupFromCheckout(home, [1, 2]);
    registerUserFromCheckoutAndProceedToCheckout(user);

    placeOrderAndDownloadInvoice(user, data, paymentData);
    deleteLoggedInUserViaUi(user);
  });
});
