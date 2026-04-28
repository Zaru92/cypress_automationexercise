import { createRandomTestUser } from '../../testData/userFactory';

import { deleteLoggedInUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Smoke | "Test Case 1: Register User"', () => {
  it('registers a new user and deletes the account', () => {
    const user = createRandomTestUser();

    registerUserViaUi(user);
    deleteLoggedInUserViaUi(user);
  });
});
