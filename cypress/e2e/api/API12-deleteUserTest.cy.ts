import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import { createAccountViaApi, deleteAccountViaApi } from '../../support/api/accountApi';
import {
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 12: DELETE METHOD To Delete User Account', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    createAccountViaApi(user).then(expectSuccessfulCreateAccount);
  });

  it('delete user account', () => {
    deleteAccountViaApi(user).then(expectSuccessfulDeleteAccount);
  });
});
