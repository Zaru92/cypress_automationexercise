import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';

import {
  createAccount,
  deleteAccount,
  getUserByEmail,
  updateAccount,
} from '../../support/api/accountApi';
import {
  type ApiUserDetailsBody,
  expectApiBody,
  expectApiMessage,
  expectApiUserMatches,
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 13: PUT METHOD To Update User Account', () => {
  let user: User;
  let newUser: User;

  before(() => {
    user = createRandomUser();

    createAccount(user).then(expectSuccessfulCreateAccount);
  });

  after(() => {
    deleteAccount(user).then(expectSuccessfulDeleteAccount);
  });

  it('update user account', () => {
    newUser = createRandomUser();

    updateAccount(user, newUser).then((response) => {
      expectApiMessage(response, 200, 'User updated!');

      getUserByEmail(user.email).then((response) => {
        const body = expectApiBody<ApiUserDetailsBody>(response);

        expect(body.responseCode).to.eq(200);
        expectApiUserMatches(body.user, user, newUser);
      });
    });
  });
});
