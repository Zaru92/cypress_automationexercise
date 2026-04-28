import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import { createAccountViaApi, deleteAccountViaApi } from '../../support/api/accountApi';
import {
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 11: POST /api/createAccount', () => {
  let user: TestUser;

  after(() => {
    deleteAccountViaApi(user).then(expectSuccessfulDeleteAccount);
  });

  it('creates a new user account and returns 201 User created', () => {
    user = createRandomTestUser();

    createAccountViaApi(user).then(expectSuccessfulCreateAccount);
  });
});
