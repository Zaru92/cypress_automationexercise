import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 4: PUT To All Brands List', () => {
  it('add brand to the list', () => {
    cy.request('PUT', '/api/brandsList').then((response) => {
      expectApiResponseMessage(response, 405, 'This request method is not supported.');
    });
  });
});
