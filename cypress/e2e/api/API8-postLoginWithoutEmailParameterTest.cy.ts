import { parseApiResponse } from '../../support/apiResponse';

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
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(400);
      expect(body.message).to.eq(
        'Bad request, email or password parameter is missing in POST request.',
      );
    });
  });
});
