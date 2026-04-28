import { parseApiResponse } from '../../support/apiResponse';

describe('API | API 2: POST To All Products List', () => {
  it('add product to the list', () => {
    cy.request('POST', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });
});
