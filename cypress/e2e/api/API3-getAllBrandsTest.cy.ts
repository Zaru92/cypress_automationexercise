import { parseApiResponse } from '../../support/apiResponse';

describe('API | API 3: Get All Brands List', () => {
  it('returns brands list', () => {
    cy.request('GET', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body).to.have.property('brands');
      expect(body.brands).to.be.an('array');
    });
  });
});
