import type { ContactMessage } from '../testData/contactFactory';

export class ContactUsPage {
  assertContactUsPageVisible() {
    cy.url().should('include', 'contact_us');
    cy.get('#contact-page').should('be.visible');
    return this;
  }

  fillForm(data: ContactMessage) {
    cy.get("[data-qa='name']").should('be.visible').clear().type(data.name);
    cy.get("[data-qa='email']").should('be.visible').clear().type(data.email);
    cy.get("[data-qa='subject']").should('be.visible').clear().type(data.subject);
    cy.get("[data-qa='message']").should('be.visible').clear().type(data.message);
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

  acceptAlert() {
    // Krok 9: OK w okienku alertu po submit
    cy.on('window:confirm', () => true);
    // czasem jest window:alert, wtedy:
    cy.on('window:alert', () => true);
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
