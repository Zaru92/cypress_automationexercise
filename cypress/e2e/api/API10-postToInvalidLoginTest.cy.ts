import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 10: POST To Verify Login with invalid details', () => {
  it('verifies login with invalid user credentials', () => {
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
