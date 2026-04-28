import { getRandomProductSearchQuery } from '../../testData/productSearchFactory';

import { expectOkApiResponseBody } from '../../support/api/assertions';

type SearchProduct = {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: object;
};

type SearchProductBody = {
  responseCode: number;
  products: SearchProduct[];
};

describe('API | API 5: POST /api/searchProduct with search_product', () => {
  it('returns 200 with non-empty product results for a valid search query', () => {
    const searchProduct = getRandomProductSearchQuery();

    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
      body: {
        search_product: searchProduct,
      },
    }).then((response) => {
      const body = expectOkApiResponseBody<SearchProductBody>(response);

      expect(body.responseCode).to.eq(200);
      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array').and.have.length.greaterThan(0);

      body.products.forEach((product) => {
        expect(product).to.include.keys(['id', 'name', 'price', 'brand', 'category']);
        expect(product.name).to.be.a('string').and.have.length.greaterThan(0);
        expect(product.price).to.be.a('string').and.have.length.greaterThan(0);
        expect(product.brand).to.be.a('string').and.have.length.greaterThan(0);
        expect(product.category).to.be.an('object');
      });
    });
  });
});
