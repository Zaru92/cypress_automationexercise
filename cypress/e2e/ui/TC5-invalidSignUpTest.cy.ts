import { HomePage } from '../../pageObjects/HomePage';
import { LoginSignupPage } from '../../pageObjects/LoginSignupPage';

describe('Regression | TC5: Signup with an existing email', () => {
  it('shows an existing-email error when signing up with a reused address', () => {
    const userName = 'test';
    const userEmail = 'test@test.test';

    const home = new HomePage();
    const auth = new LoginSignupPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginSignupPageVisible()
      .enterSignupName(userName)
      .enterSignupEmail(userEmail)
      .submitSignup()
      .assertExistingEmailSignupErrorVisible();
  });
});
