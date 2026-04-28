import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';

import {
  deleteLoggedUserViaUi,
  loginViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Smoke | "Test Case 2: Login User with correct email and password"', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    registerUserViaUiAndLogout(user);
  });

  it('logs in with correct credentials and deletes the account', () => {
    loginViaUi(user);
    deleteLoggedUserViaUi(user);
  });
});
