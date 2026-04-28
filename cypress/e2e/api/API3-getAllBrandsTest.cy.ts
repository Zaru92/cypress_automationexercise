import { expectOkApiResponseBody } from '../../support/api/assertions';

type BrandsListBody = {
  brands: unknown[];
};

describe('API | API 3: GET /api/brandsList', () => {
  it('returns 200 with a brands array', () => {
    cy.request('GET', '/api/brandsList').then((response) => {
      const body = expectOkApiResponseBody<BrandsListBody>(response);

      expect(body).to.have.property('brands');
      expect(body.brands).to.be.an('array');
    });
  });
});
