import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import {
  deleteLoggedInUserViaUi,
  loginUserViaUi,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Smoke | TC2: Login with valid credentials', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    registerUserViaUiAndLogout(user);
  });

  it('logs in with an existing user and deletes the account', () => {
    loginUserViaUi(user);
    deleteLoggedInUserViaUi(user);
  });
});
