describe('API | API 4: PUT To All Brands List', () => {
  it('add brand to the list', () => {
    cy.request('PUT', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200);

      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;

      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });
});
