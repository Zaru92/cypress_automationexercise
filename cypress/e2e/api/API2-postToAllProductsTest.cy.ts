describe('API | API 2: POST To All Products List', () => {
  it('add product to the list', () => {
    cy.request('POST', '/api/productsList').then((response) => {
      expect(response.status).to.eq(200);

      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;

      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });
});
