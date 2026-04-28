import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import {
  createAccountViaApi,
  deleteAccountViaApi,
  verifyLoginViaApi,
} from '../../support/api/accountApi';
import {
  expectApiResponseMessage,
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 7: POST To Verify Login with valid details', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    createAccountViaApi(user).then(expectSuccessfulCreateAccount);
  });

  after(() => {
    deleteAccountViaApi(user).then(expectSuccessfulDeleteAccount);
  });

  it('verifies login with valid user credentials', () => {
    verifyLoginViaApi(user.email, user.password).then((response) => {
      expectApiResponseMessage(response, 200, 'User exists!');
    });
  });
});
