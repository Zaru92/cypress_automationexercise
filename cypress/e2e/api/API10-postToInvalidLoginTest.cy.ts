import { parseApiResponse } from '../../support/apiResponse';

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
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(404);
      expect(body.message).to.eq('User not found!');
    });
  });
});
