import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 10: POST /api/verifyLogin with invalid credentials', () => {
  it('returns 404 and User not found for invalid login credentials', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      body: {
        email: 'Email',
        password: 'Password',
      },
    }).then((response) => {
      expectApiResponseMessage(response, 404, 'User not found!');
    });
  });
});
