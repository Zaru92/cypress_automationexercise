import { parseApiResponse } from '../../support/apiResponse';

describe('API | API 1: Get All Products List', () => {
  it('returns products list', () => {
    cy.request('GET', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array');
    });
  });
});
