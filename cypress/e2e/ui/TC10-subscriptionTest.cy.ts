import { HomePage } from '../../pageObjects/HomePage';
import { createRandomUser } from '../../testData/userFactory';

describe('Regression | Test Case 10: Verify Subscription in home page', () => {
  it('submit scubsctiption and verify success message', () => {
    const home = new HomePage();
    const user = createRandomUser();

    home
      .visit()
      .assertLoaded()
      .submitSubscription(user.email)
      .assertSubscriptionSuccessMessageVisible();
  });
});
