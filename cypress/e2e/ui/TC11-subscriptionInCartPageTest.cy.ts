import { createRandomTestUser } from '../../testData/userFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | TC11: Cart page subscription', () => {
  it('submits a cart page subscription and verifies the success message', () => {
    const user = createRandomTestUser();

    const home = new HomePage();
    const cart = new CartPage();

    home.visit().assertLoaded().goToCartPage();

    cart
      .assertCartPageVisible()
      .submitSubscription(user.email)
      .assertSubscriptionSuccessMessageVisible();
  });
});
