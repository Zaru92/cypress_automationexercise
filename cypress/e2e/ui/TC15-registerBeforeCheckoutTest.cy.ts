import { createRandomUser } from '../../testData/userFactory';
import { createRandomContactMessage } from '../../testData/contactFactory';
import { createRandomPaymentDetails } from '../../testData/paymentFactory';

import { CartPage } from '../../pageObjects/CartPage';

import { addProductsAndViewCart } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import { deleteLoggedUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Regression | Test Case 15: Place Order: Register before Checkout', () => {
  it('register account before placing order', () => {
    const user = createRandomUser();
    const data = createRandomContactMessage();
    const paymentData = createRandomPaymentDetails();

    const cart = new CartPage();

    const home = registerUserViaUi(user);

    home.assertLoaded();
    addProductsAndViewCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout();

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedUserViaUi(user);
  });
});
