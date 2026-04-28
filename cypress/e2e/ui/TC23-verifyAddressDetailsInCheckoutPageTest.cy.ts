import { createRandomTestUser } from '../../testData/userFactory';

import { CheckoutPage } from '../../pageObjects/CheckoutPage';

import { addProductsToCartAndProceedToCheckout } from '../../support/flows/cartFlows';
import { deleteLoggedInUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Regression | TC23: Checkout address details', () => {
  it('registers a user, starts checkout, and verifies delivery and billing addresses', () => {
    const user = createRandomTestUser();

    const checkout = new CheckoutPage();

    const home = registerUserViaUi(user);

    home.assertLoaded();
    addProductsToCartAndProceedToCheckout(home, [1, 2]);

    checkout
      .assertCheckoutPageVisible()
      .assertDeliveryAddressDetails(user)
      .assertBillingAddressDetails(user);

    home.visit();
    deleteLoggedInUserViaUi(user);
  });
});
