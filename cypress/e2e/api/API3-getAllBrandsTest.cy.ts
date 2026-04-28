import { requestBrandsListViaApi } from '../../support/api/catalogApi';
import { expectArrayResponseProperty } from '../../support/api/assertions';

describe('API | API 3: GET /api/brandsList', () => {
  it('returns 200 with a brands array', () => {
    requestBrandsListViaApi().then((response) => {
      expectArrayResponseProperty(response, 'brands');
    });
  });
});
