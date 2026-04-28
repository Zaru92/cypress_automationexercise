import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import {
  deleteLoggedInUserViaUi,
  loginUserViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Smoke | "Test Case 2: Login User with correct email and password"', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    registerUserViaUiAndLogout(user);
  });

  it('logs in with correct credentials and deletes the account', () => {
    loginUserViaUi(user);
    deleteLoggedInUserViaUi(user);
  });
});
