import { createRandomTestUser } from '../../testData/userFactory';

import { HomePage } from '../../pageObjects/HomePage';

describe('Regression | TC10: Home page subscription', () => {
  it('submits a home page subscription and verifies the success message', () => {
    const home = new HomePage();
    const user = createRandomTestUser();

    home
      .visit()
      .assertLoaded()
      .submitSubscription(user.email)
      .assertSubscriptionSuccessMessageVisible();
  });
});
