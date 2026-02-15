describe('API | Products', () => {
  it('returns products list', () => {
    cy.request('GET', 'https://automationexercise.com/api/productsList').then((response) => {
      expect(response.status).to.eq(200);
      // API zwraca body jako string JSON w wielu przypadkach — bezpiecznie parsujemy:
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;

      expect(body).to.have.property('products');
      expect(body.products).to.be.an('array');
    });
  });
});
