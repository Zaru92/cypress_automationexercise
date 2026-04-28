import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import { createAccountViaApi, deleteAccountViaApi } from '../../support/api/accountApi';
import {
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 12: DELETE /api/deleteAccount', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    createAccountViaApi(user).then(expectSuccessfulCreateAccount);
  });

  it('deletes an existing user account and returns 200 Account deleted', () => {
    deleteAccountViaApi(user).then(expectSuccessfulDeleteAccount);
  });
});
