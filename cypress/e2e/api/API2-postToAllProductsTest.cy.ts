import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 2: POST To All Products List', () => {
  it('add product to the list', () => {
    cy.request('POST', '/api/productsList').then((response) => {
      expectApiResponseMessage(response, 405, 'This request method is not supported.');
    });
  });
});
