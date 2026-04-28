import { createRandomTestUser } from '../../testData/userFactory';
import { createRandomContactFormData } from '../../testData/contactFactory';
import { createRandomCardPaymentDetails } from '../../testData/paymentFactory';

import { CartPage } from '../../pageObjects/CartPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';
import { placeOrderAndContinue } from '../../support/flows/orderFlows';
import { deleteLoggedInUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Regression | Test Case 15: Place Order: Register before Checkout', () => {
  it('register account before placing order', () => {
    const user = createRandomTestUser();
    const data = createRandomContactFormData();
    const paymentData = createRandomCardPaymentDetails();

    const cart = new CartPage();

    const home = registerUserViaUi(user);

    home.assertLoaded();
    addProductsToCartAndOpenCart(home, [1, 2]);

    cart.assertCartPageVisible().proceedToCheckout();

    placeOrderAndContinue(user, data, paymentData);
    deleteLoggedInUserViaUi(user);
  });
});
