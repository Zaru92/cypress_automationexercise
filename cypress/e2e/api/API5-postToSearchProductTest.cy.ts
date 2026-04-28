import { getRandomProductSearchQuery } from '../../testData/productSearchFactory';

import { searchProductsViaApi } from '../../support/api/catalogApi';
import { expectSearchProductsResponse } from '../../support/api/assertions';

describe('API | API 5: POST /api/searchProduct with search_product', () => {
  it('returns 200 with non-empty product results for a valid search query', () => {
    const searchProduct = getRandomProductSearchQuery();

    searchProductsViaApi(searchProduct).then(expectSearchProductsResponse);
  });
});
