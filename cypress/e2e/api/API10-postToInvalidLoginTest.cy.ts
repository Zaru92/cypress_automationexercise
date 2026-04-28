import { requestVerifyLoginViaApi } from '../../support/api/accountApi';
import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 10: POST /api/verifyLogin with invalid credentials', () => {
  it('returns 404 and User not found for invalid login credentials', () => {
    requestVerifyLoginViaApi({ email: 'Email', password: 'Password' }).then((response) => {
      expectApiResponseMessage(response, 404, 'User not found!');
    });
  });
});
