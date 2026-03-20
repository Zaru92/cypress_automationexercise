import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';
import { createRandomUser } from '../../testData/userFactory';

describe('Regression | Test Case 11: Verify Subscription in Cart page', () => {
  it('submit scubsctiption in Cart page and verify success message', () => {
    const home = new HomePage();
    const cart = new CartPage();
    const user = createRandomUser();

    home.visit().assertLoaded().goToCartPage();

    cart
      .assertCartPageVisible()
      .submitSubscription(user.email)
      .assertSubscriptionSuccessMessageVisible();
  });
});
