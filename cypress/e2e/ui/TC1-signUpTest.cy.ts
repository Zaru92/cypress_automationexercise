import { createRandomUser } from '../../testData/userFactory';

import { deleteLoggedUserViaUi, registerUserViaUi } from '../../support/flows/userFlows';

describe('Smoke | "Test Case 1: Register User"', () => {
  it('registers a new user and deletes the account', () => {
    const user = createRandomUser();

    registerUserViaUi(user);
    deleteLoggedUserViaUi(user);
  });
});
