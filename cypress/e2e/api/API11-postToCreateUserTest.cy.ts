import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';

import { createAccount, deleteAccount } from '../../support/api/accountApi';
import {
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 11: POST To Create/Register User Account', () => {
  let user: User;

  after(() => {
    deleteAccount(user).then(expectSuccessfulDeleteAccount);
  });

  it('create user account', () => {
    user = createRandomUser();

    createAccount(user).then(expectSuccessfulCreateAccount);
  });
});
