import { createRandomTestUser } from '../../testData/userFactory';

import { deleteLoggedInUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Smoke | TC1: Register user account', () => {
  it('registers a new user, verifies the logged-in state, and deletes the account', () => {
    const user = createRandomTestUser();

    registerUserViaUi(user);
    deleteLoggedInUserViaUi(user);
  });
});
