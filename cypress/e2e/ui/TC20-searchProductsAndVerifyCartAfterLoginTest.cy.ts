import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';
import { getSearchQuery } from '../../testData/productSearchFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { AuthPage } from '../../pageObjects/AuthPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreationSuccessPage } from '../../pageObjects/AccountCreationSuccessPage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | Test Case 20: Search Products and Verify Cart After Login', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    const home = new HomePage();
    const auth = new AuthPage();
    const signup = new SignupPage();
    const confirmation = new AccountCreationSuccessPage();

    home.visit().assertLoaded().goToSignupLoginPage();

    auth
      .assertLoginOrSignupPageVisible()
      .enterSignupName(user.name)
      .enterSignupEmail(user.email)
      .clickSignupButton();

    signup
      .assertSignupFormVisible()
      .fillAccountInformation(user)
      .selectNewsletterAndOffers()
      .fillAddressDetails(user)
      .confirmAccountCreation();

    confirmation.assertAccountCreated().continueAfterCreation();

    cy.ensureAppDomain();

    home.logout();

    auth.assertLoginOrSignupPageVisible();
  });

  after(() => {
    const home = new HomePage();

    home
      .visit()
      .assertLoggedInAs(user.name)
      .deleteAccount()
      .continueAfterDeleted()
      .assertAccountDeleted(user.name);
  });

  it('search product, add to cart and verify that product is still in the cart after login', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();
    const auth = new AuthPage();
    const query = getSearchQuery();

    home.visit().assertLoaded().goToProductsPage();

    products
      .assertProductsPageVisible()
      .searchProduct(query)
      .assertSearchedProductVisible(query)
      .getFirstVisibleProductId()
      .then((productId) => {
        products.addToCart(productId).viewCart();
        cart
          .assertCartPageVisible()
          .assertProductAddedToCartVisible(productId)
          .goToSignupLoginPage();
        auth
          .assertLoginOrSignupPageVisible()
          .enterLoginEmail(user.email)
          .enterPassword(user.password)
          .clickLoginButton();
        home.goToCartPage();
        cart.assertCartPageVisible().assertProductAddedToCartVisible(productId);
      });
  });
});
