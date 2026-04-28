import { createRandomTestUser } from '../../testData/userFactory';
import type { TestUser } from '../../testData/userFactory';
import { getRandomProductSearchQuery } from '../../testData/productSearchFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';
import {
  deleteLoggedInUserViaUi,
  loginUserFromLoginSignupPage,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | TC20: Search result cart persistence after login', () => {
  let user: TestUser;

  before(() => {
    user = createRandomTestUser();

    registerUserViaUiAndLogout(user);
  });

  after(() => {
    deleteLoggedInUserViaUi(user);
  });

  it('searches for a product, adds the first result to the cart, logs in, and verifies the cart persists', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();
    const query = getRandomProductSearchQuery();

    home.visit().assertLoaded().goToProductsPage();

    products
      .assertProductsPageVisible()
      .searchProduct(query)
      .assertSearchResultsContainProduct(query)
      .getFirstVisibleProductId()
      .then((productId) => {
        addProductsToCartAndOpenCart(products, [productId]);
        cart
          .assertCartPageVisible()
          .assertProductAddedToCartVisible(productId)
          .goToSignupLoginPage();
        loginUserFromLoginSignupPage(user);
        home.goToCartPage();
        cart.assertCartPageVisible().assertProductAddedToCartVisible(productId);
      });
  });
});
