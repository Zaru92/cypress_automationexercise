import { expectApiMessage } from '../../support/api/assertions';

describe('API | API 6: POST To Search Product without search_product parameter', () => {
  it('returns error for empty parameter', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
    }).then((response) => {
      expectApiMessage(
        response,
        400,
        'Bad request, search_product parameter is missing in POST request.',
      );
    });
  });
});
