import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';

import {
  deleteLoggedUserViaUi,
  loginViaUi,
  logoutLoggedUserViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | "Test Case 4: Logout User"', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    registerUserViaUiAndLogout(user);
  });

  after(() => {
    loginViaUi(user);
    deleteLoggedUserViaUi(user);
  });

  it('logout current user', () => {
    loginViaUi(user);
    logoutLoggedUserViaUi(user);
  });
});
