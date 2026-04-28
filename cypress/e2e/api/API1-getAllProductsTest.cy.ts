import { expectApiBody } from '../../support/api/assertions';

type ProductsListBody = {
  products: unknown[];
};

describe('API | API 1: Get All Products List', () => {
  it('returns products list', () => {
    cy.request('GET', '/api/productsList').then((response) => {
      const body = expectApiBody<ProductsListBody>(response);

      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array');
    });
  });
});
