import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';
import { createRandomUser } from '../../testData/userFactory';

describe('Regression | Test Case 10: Verify Subscription in home page', () => {
  it('submit scubsctiption and verify success message', () => {
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
