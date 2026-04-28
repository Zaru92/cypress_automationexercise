import { requestBrandsListViaApi } from '../../support/api/catalogApi';
import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 4: PUT /api/brandsList', () => {
  it('returns 405 method not supported for brands list PUT requests', () => {
    requestBrandsListViaApi('PUT').then((response) => {
      expectApiResponseMessage(response, 405, 'This request method is not supported.');
    });
  });
});
