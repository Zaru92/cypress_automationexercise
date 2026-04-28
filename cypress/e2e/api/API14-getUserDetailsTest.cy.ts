import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';

import { createAccount, deleteAccount, getUserByEmail } from '../../support/api/accountApi';
import {
  type ApiUserDetailsBody,
  expectApiBody,
  expectApiUserMatches,
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 14: GET user account detail by email', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    createAccount(user).then(expectSuccessfulCreateAccount);
  });

  after(() => {
    deleteAccount(user).then(expectSuccessfulDeleteAccount);
  });

  it('get user account details by email', () => {
    getUserByEmail(user.email).then((response) => {
      const body = expectApiBody<ApiUserDetailsBody>(response);

      expect(body.responseCode).to.eq(200);
      expectApiUserMatches(body.user, user);
    });
  });
});
