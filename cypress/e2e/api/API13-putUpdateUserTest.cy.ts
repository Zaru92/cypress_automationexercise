import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import {
  createAccountViaApi,
  deleteAccountViaApi,
  getUserDetailsByEmail,
  updateAccountViaApi,
} from '../../support/api/accountApi';
import {
  type GetUserDetailsResponseBody,
  expectOkApiResponseBody,
  expectApiResponseMessage,
  expectApiUserDetailsToMatch,
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 13: PUT METHOD To Update User Account', () => {
  let user: TestUser;
  let newUser: TestUser;

  before(() => {
    user = createRandomTestUser();

    createAccountViaApi(user).then(expectSuccessfulCreateAccount);
  });

  after(() => {
    deleteAccountViaApi(user).then(expectSuccessfulDeleteAccount);
  });

  it('update user account', () => {
    newUser = createRandomTestUser();

    updateAccountViaApi(user, newUser).then((response) => {
      expectApiResponseMessage(response, 200, 'User updated!');

      getUserDetailsByEmail(user.email).then((response) => {
        const body = expectOkApiResponseBody<GetUserDetailsResponseBody>(response);

        expect(body.responseCode).to.eq(200);
        expectApiUserDetailsToMatch(body.user, user, newUser);
      });
    });
  });
});
