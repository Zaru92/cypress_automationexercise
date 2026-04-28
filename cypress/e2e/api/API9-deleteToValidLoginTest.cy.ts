import { parseApiResponse } from '../../support/apiResponse';

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
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });
});
