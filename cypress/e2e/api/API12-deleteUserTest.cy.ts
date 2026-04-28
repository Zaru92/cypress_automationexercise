import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';

import { createAccount, deleteAccount } from '../../support/api/accountApi';
import {
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 12: DELETE METHOD To Delete User Account', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    createAccount(user).then(expectSuccessfulCreateAccount);
  });

  it('delete user account', () => {
    deleteAccount(user).then(expectSuccessfulDeleteAccount);
  });
});
