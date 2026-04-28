import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import { createAccountViaApi, deleteAccountViaApi } from '../../support/api/accountApi';
import {
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 11: POST To Create/Register User Account', () => {
  let user: TestUser;

  after(() => {
    deleteAccountViaApi(user).then(expectSuccessfulDeleteAccount);
  });

  it('create user account', () => {
    user = createRandomTestUser();

    createAccountViaApi(user).then(expectSuccessfulCreateAccount);
  });
});
