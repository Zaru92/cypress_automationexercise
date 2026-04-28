import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 2: POST /api/productsList', () => {
  it('returns 405 method not supported for products list POST requests', () => {
    cy.request('POST', '/api/productsList').then((response) => {
      expectApiResponseMessage(response, 405, 'This request method is not supported.');
    });
  });
});
