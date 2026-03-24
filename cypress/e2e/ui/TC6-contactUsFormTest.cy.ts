import { createRandomContactMessage } from '../../testData/contactFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ContactUsPage } from '../../pageObjects/ContactUsPage';

describe('Regression | "Test Case 6: Contact Us Form"', () => {
  it('fill in and submit contact form', () => {
    const data = createRandomContactMessage();

    const home = new HomePage();
    const contact = new ContactUsPage();

    home.visit().assertLoaded().goToContactUsPage();

    contact
      .assertContactUsPageVisible()
      .fillForm(data)
      .uploadFile('sample_upload.txt')
      .submit()
      .assertSuccessMessageVisible()
      .clickHome();

    home.assertLoaded();
  });
});
