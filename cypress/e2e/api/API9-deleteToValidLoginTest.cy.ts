import { expectApiMessage } from '../../support/api/assertions';

describe('API | API 9: DELETE To Verify Login', () => {
  it('returns method not supported for verify login DELETE request', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/verifyLogin',
      form: true,
      body: {
        email: 'Email',
        password: 'Password',
      },
    }).then((response) => {
      expectApiMessage(response, 405, 'This request method is not supported.');
    });
  });
});
