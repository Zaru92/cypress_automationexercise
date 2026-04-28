import { expectOkApiResponseBody } from '../../support/api/assertions';

type ProductsListBody = {
  products: unknown[];
};

describe('API | API 1: GET /api/productsList', () => {
  it('returns 200 with a products array', () => {
    cy.request('GET', '/api/productsList').then((response) => {
      const body = expectOkApiResponseBody<ProductsListBody>(response);

      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array');
    });
  });
});
