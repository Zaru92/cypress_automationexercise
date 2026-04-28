describe('API | API 3: Get All Brands List', () => {
  it('returns brands list', () => {
    cy.request('GET', '/api/brandsList').then((response) => {
      expect(response.status).to.eq(200);

      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;

      expect(body).to.have.property('brands');
      expect(body.brands).to.be.an('array');
    });
  });
});
