import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 9: DELETE /api/verifyLogin', () => {
  it('returns 405 method not supported for verify login DELETE requests', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/verifyLogin',
      form: true,
      body: {
        email: 'Email',
        password: 'Password',
      },
    }).then((response) => {
      expectApiResponseMessage(response, 405, 'This request method is not supported.');
    });
  });
});
