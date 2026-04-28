import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';

import { createAccount, deleteAccount, verifyLogin } from '../../support/api/accountApi';
import {
  expectApiMessage,
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 7: POST To Verify Login with valid details', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    createAccount(user).then(expectSuccessfulCreateAccount);
  });

  after(() => {
    deleteAccount(user).then(expectSuccessfulDeleteAccount);
  });

  it('verifies login with valid user credentials', () => {
    verifyLogin(user.email, user.password).then((response) => {
      expectApiMessage(response, 200, 'User exists!');
    });
  });
});
