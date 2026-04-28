import { createRandomContactFormData } from '../../testData/contactFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ContactUsPage } from '../../pageObjects/ContactUsPage';

describe('Smoke | TC6: Contact us form submission', () => {
  it('submits the contact form with an uploaded file and returns to the home page', () => {
    const data = createRandomContactFormData();

    const home = new HomePage();
    const contact = new ContactUsPage();

    home.visit().assertLoaded().goToContactUsPage();

    contact
      .assertContactUsPageVisible()
      .fillContactForm(data)
      .uploadFile('sample_upload.txt')
      .submitContactForm()
      .assertSuccessMessageVisible()
      .goToHomePage();

    home.assertLoaded();
  });
});
