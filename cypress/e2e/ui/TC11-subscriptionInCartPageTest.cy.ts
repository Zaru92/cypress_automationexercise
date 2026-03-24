import { createRandomUser } from '../../testData/userFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | Test Case 11: Verify Subscription in Cart page', () => {
  it('submit scubsctiption in Cart page and verify success message', () => {
    const user = createRandomUser();

    const home = new HomePage();
    const cart = new CartPage();

    home.visit().assertLoaded().goToCartPage();

    cart
      .assertCartPageVisible()
      .submitSubscription(user.email)
      .assertSubscriptionSuccessMessageVisible();
  });
});
