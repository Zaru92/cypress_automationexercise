describe('API | API 6: POST To Search Product without search_product parameter', () => {
  it('returns error for empty parameter', () => {
    cy.request({
      method: 'POST',
      url: '/api/searchProduct',
      form: true,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;

      expect(body.responseCode).to.eq(400);
      expect(body.message).to.eq(
        'Bad request, search_product parameter is missing in POST request.',
      );
    });
  });
});
