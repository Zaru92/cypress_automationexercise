import type { ContactMessage } from '../testData/contactFactory';

export class ContactUsPage {
  assertContactUsPageVisible() {
    cy.url().should('include', 'contact_us');
    cy.get('#contact-page').should('be.visible');
    return this;
  }

  fillForm(data: ContactMessage) {
    cy.get("[data-qa='name']").clear();
    cy.get("[data-qa='name']").type(data.name);
    cy.get("[data-qa='email']").clear();
    cy.get("[data-qa='email']").type(data.email);
    cy.get("[data-qa='subject']").clear();
    cy.get("[data-qa='subject']").type(data.subject);
    cy.get("[data-qa='message']").clear();
    cy.get("[data-qa='message']").type(data.message);
    return this;
  }

  uploadFile(fixtureFileName: string) {
    cy.get('[type="file"]').should('exist').selectFile(`cypress/fixtures/${fixtureFileName}`);

    return this;
  }

  submit() {
    cy.get("[data-qa='submit-button']").click();
    return this;
  }

  assertSuccessMessageVisible() {
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    return this;
  }

  clickHome() {
    cy.contains('Home').click();
    return this;
  }
}
