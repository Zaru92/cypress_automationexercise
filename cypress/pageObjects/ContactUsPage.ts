import type { ContactFormData } from '../testData/contactFactory';
import { clickQaField, fillQaFields } from './components/FormControls';

export class ContactUsPage {
  assertContactUsPageVisible() {
    cy.url().should('include', 'contact_us');
    cy.get('#contact-page').should('be.visible');
    return this;
  }

  fillContactForm(data: ContactFormData) {
    fillQaFields({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    return this;
  }

  uploadFile(fixtureFileName: string) {
    cy.get('[type="file"]').should('exist').selectFile(`cypress/fixtures/${fixtureFileName}`);

    return this;
  }

  submitContactForm() {
    clickQaField('submit-button');
    return this;
  }

  assertSuccessMessageVisible() {
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    return this;
  }

  goToHomePage() {
    cy.contains('Home').click();
    return this;
  }
}
