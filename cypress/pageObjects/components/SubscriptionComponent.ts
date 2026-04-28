export class SubscriptionComponent {
  subscribeWithEmail(email: string) {
    cy.logStep(`Subscribe with email: ${email}`);
    cy.contains('Subscription').should('be.visible');
    cy.get('#susbscribe_email').clear();
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    return this;
  }

  assertSuccessMessageVisible() {
    cy.logStep('Assert subscription component success message is visible');
    cy.get('#success-subscribe').should('be.visible');
    cy.contains('You have been successfully subscribed!').should('be.visible');
    return this;
  }
}
