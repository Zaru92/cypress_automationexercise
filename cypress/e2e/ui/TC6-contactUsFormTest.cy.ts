import { createRandomContactFormData } from '../../testData/contactFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ContactUsPage } from '../../pageObjects/ContactUsPage';

describe('Smoke | "Test Case 6: Contact Us Form"', () => {
  it('fill in and submit contact form', () => {
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
