import { createRandomTestUser } from '../../testData/userFactory';
import { createRandomContactFormData } from '../../testData/contactFactory';
import { createRandomCardPaymentDetails } from '../../testData/paymentFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';
import { placeOrderAndDownloadInvoice } from '../../support/flows/orderFlows';
import {
  deleteLoggedInUserViaUi,
  registerUserFromLoginSignupPage,
} from '../../support/flows/userFlows';

describe('Regression | Test Case 24: Download Invoice after purchase order', () => {
  it('register account during placing order and download invoice after purchase', () => {
    const user = createRandomTestUser();
    const data = createRandomContactFormData();
    const paymentData = createRandomCardPaymentDetails();

    const home = new HomePage();
    const cart = new CartPage();

    home.visit().assertLoaded();
    addProductsToCartAndOpenCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout().goToLoginSignupPageFromCheckoutModal();

    registerUserFromLoginSignupPage(user).assertLoaded().goToCartPage();

    cart.assertCartPageVisible().proceedToCheckout();

    placeOrderAndDownloadInvoice(user, data, paymentData);
    deleteLoggedInUserViaUi(user);
  });
});
