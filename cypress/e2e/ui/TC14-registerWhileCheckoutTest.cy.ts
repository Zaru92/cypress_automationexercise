import { createRandomTestUser } from '../../testData/userFactory';
import { createRandomContactFormData } from '../../testData/contactFactory';
import { createRandomCardPaymentDetails } from '../../testData/paymentFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import {
  deleteLoggedInUserViaUi,
  registerUserFromLoginSignupPage,
} from '../../support/flows/userFlows';

describe('Regression | TC14: Register during checkout and place order', () => {
  it('adds products, registers from the checkout modal, places an order, and deletes the account', () => {
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

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedInUserViaUi(user);
  });
});
