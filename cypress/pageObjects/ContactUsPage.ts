import type { ContactFormData } from '../testData/contactFactory';
import { clickQaField, fillQaFields } from './components/FormControls';

export class ContactUsPage {
  assertContactUsPageVisible() {
    cy.logStep('Assert contact us page is visible');
    cy.url().should('include', 'contact_us');
    cy.get('#contact-page').should('be.visible');

    return this;
  }

  fillContactForm(data: ContactFormData) {
    cy.logStep(`Fill contact form for ${data.email}`);

    fillQaFields({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    return this;
  }

  uploadFile(fixtureFileName: string) {
    cy.logStep(`Upload fixture file: ${fixtureFileName}`);
    cy.get('[type="file"]').should('exist').selectFile(`cypress/fixtures/${fixtureFileName}`);

    return this;
  }

  submitContactForm() {
    cy.logStep('Submit contact form');
    clickQaField('submit-button');

    return this;
  }

  assertSuccessMessageVisible() {
    cy.logStep('Assert contact form success message is visible');
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');

    return this;
  }

  goToHomePage() {
    cy.logStep('Navigate to home page from contact us page');
    cy.contains('Home').click();

    return this;
  }
}
