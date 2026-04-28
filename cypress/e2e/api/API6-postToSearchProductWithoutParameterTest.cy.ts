import { expectApiResponseMessage } from '../../support/api/assertions';

describe('API | API 6: POST /api/searchProduct without search_product', () => {
  it('returns 400 when search_product is missing from the POST request', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
    }).then((response) => {
      expectApiResponseMessage(
        response,
        400,
        'Bad request, search_product parameter is missing in POST request.',
      );
    });
  });
});
