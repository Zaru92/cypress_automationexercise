export class SubscriptionComponent {
  submit(email: string) {
    cy.contains('Subscription').should('be.visible');
    cy.get('#susbscribe_email').clear();
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    return this;
  }

  assertSuccessMessageVisible() {
    cy.get('#success-subscribe').should('be.visible');
    cy.contains('You have been successfully subscribed!').should('be.visible');
    return this;
  }
}
