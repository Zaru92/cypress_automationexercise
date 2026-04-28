import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';

import {
  createAccountViaApi,
  deleteAccountViaApi,
  getUserDetailsByEmail,
} from '../../support/api/accountApi';
import {
  type GetUserDetailsResponseBody,
  expectOkApiResponseBody,
  expectApiUserDetailsToMatch,
  expectSuccessfulCreateAccount,
  expectSuccessfulDeleteAccount,
} from '../../support/api/assertions';

describe('API | API 14: GET /api/getUserDetailByEmail', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    createAccountViaApi(user).then(expectSuccessfulCreateAccount);
  });

  after(() => {
    deleteAccountViaApi(user).then(expectSuccessfulDeleteAccount);
  });

  it('returns user details matching the requested account email', () => {
    getUserDetailsByEmail(user.email).then((response) => {
      const body = expectOkApiResponseBody<GetUserDetailsResponseBody>(response);

      expect(body.responseCode).to.eq(200);
      expectApiUserDetailsToMatch(body.user, user);
    });
  });
});
