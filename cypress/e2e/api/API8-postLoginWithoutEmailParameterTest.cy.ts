import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 8: POST To Verify Login without email parameter', () => {
  it('verifies login with valid user credentials', () => {
    cy.request({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      body: {
        password: 'Password',
      },
    }).then((response) => {
      expectApiResponseMessage(
        response,
        400,
        'Bad request, email or password parameter is missing in POST request.',
      );
    });
  });
});
