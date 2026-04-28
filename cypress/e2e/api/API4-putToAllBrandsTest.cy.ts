import { parseApiResponse } from '../../support/apiResponse';

describe('API | API 4: PUT To All Brands List', () => {
  it('add brand to the list', () => {
    cy.request('PUT', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });
});
