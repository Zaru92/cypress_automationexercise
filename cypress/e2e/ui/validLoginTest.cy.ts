import { AuthPage } from '../../pageObjects/AuthPage';
import { HomePage } from '../../pageObjects/HomePage';

type ValidUser = {
  name: string;
  email: string;
  password: string;
};

describe('Regression | "Test Case 2: Login User with correct email and password"', () => {
  it('logs in with valid credentials from fixtures', () => {
    cy.fixture('users').then((data: { validUser: ValidUser }) => {
      const user = data.validUser;

      const home = new HomePage();
      const auth = new AuthPage();

      home.visit().assertLoaded().goToSignupLoginPage();

      auth.enterLoginEmail(user.email).enterPassword(user.password).clickLoginButton();

      home.assertLoggedInAs(user.name);
    });
  });
});
