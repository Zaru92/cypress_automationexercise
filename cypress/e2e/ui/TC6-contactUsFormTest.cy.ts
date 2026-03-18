import { ContactUsPage } from '../../pageObjects/ContactUsPage';
import { HomePage } from '../../pageObjects/HomePage';
import { createRandomContactMessage } from '../../testData/contactFactory';

describe('Regression | "Test Case 6: Contact Us Form"', () => {
  it('fill in and submit contact form', () => {
    const home = new HomePage();
    const contact = new ContactUsPage();
    const data = createRandomContactMessage();

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
