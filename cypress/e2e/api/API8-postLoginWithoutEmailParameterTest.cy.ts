import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 8: POST /api/verifyLogin without email', () => {
  it('returns 400 when email is missing from the POST request', () => {
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
