import { createRandomUser } from '../../testData/userFactory';
import { createRandomContactMessage } from '../../testData/contactFactory';
import { createRandomPaymentDetails } from '../../testData/paymentFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

import { addProductsAndViewCart } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import { deleteLoggedUserViaUi, registerFromAuthPage } from '../../support/flows/userFlows';

describe('Regression | Test Case 14: Place Order: Register while Checkout', () => {
  it('register account during placing order', () => {
    const user = createRandomUser();
    const data = createRandomContactMessage();
    const paymentData = createRandomPaymentDetails();

    const home = new HomePage();
    const cart = new CartPage();

    home.visit().assertLoaded();
    addProductsAndViewCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout().goToAuthPage();

    registerFromAuthPage(user).assertLoaded().goToCartPage();

    cart.assertCartPageVisible().proceedToCheckout();

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedUserViaUi(user);
  });
});
