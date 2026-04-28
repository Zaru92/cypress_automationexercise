import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import {
  deleteLoggedInUserViaUi,
  loginUserViaUi,
  logoutCurrentUserViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | "Test Case 4: Logout User"', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    registerUserViaUiAndLogout(user);
  });

  after(() => {
    loginUserViaUi(user);
    deleteLoggedInUserViaUi(user);
  });

  it('logout current user', () => {
    loginUserViaUi(user);
    logoutCurrentUserViaUi(user);
  });
});
