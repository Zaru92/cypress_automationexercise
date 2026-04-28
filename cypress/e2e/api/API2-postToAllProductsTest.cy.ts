import { requestProductsListViaApi } from '../../support/api/catalogApi';
import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 2: POST /api/productsList', () => {
  it('returns 405 method not supported for products list POST requests', () => {
    requestProductsListViaApi('POST').then((response) => {
      expectApiResponseMessage(response, 405, 'This request method is not supported.');
    });
  });
});
