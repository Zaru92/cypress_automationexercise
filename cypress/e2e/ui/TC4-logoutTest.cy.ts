import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import {
  deleteLoggedInUserViaUi,
  loginUserViaUi,
  logoutCurrentUserViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | TC4: Logout user', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    registerUserViaUiAndLogout(user);
  });

  after(() => {
    loginUserViaUi(user);
    deleteLoggedInUserViaUi(user);
  });

  it('logs in an existing user, logs out, and verifies the login page is shown', () => {
    loginUserViaUi(user);
    logoutCurrentUserViaUi(user);
  });
});
