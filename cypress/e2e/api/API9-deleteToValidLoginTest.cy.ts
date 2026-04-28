import { requestVerifyLoginViaApi } from '../../support/api/accountApi';
import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 9: DELETE /api/verifyLogin', () => {
  it('returns 405 method not supported for verify login DELETE requests', () => {
    requestVerifyLoginViaApi({ email: 'Email', password: 'Password' }, 'DELETE').then(
      (response) => {
        expectApiResponseMessage(response, 405, 'This request method is not supported.');
      },
    );
  });
});
