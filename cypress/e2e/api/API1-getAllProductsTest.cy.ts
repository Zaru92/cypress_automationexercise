import { requestProductsListViaApi } from '../../support/api/catalogApi';
import { expectArrayResponseProperty } from '../../support/api/assertions';

describe('API | API 1: GET /api/productsList', () => {
  it('returns 200 with a products array', () => {
    requestProductsListViaApi().then((response) => {
      expectArrayResponseProperty(response, 'products');
    });
  });
});
