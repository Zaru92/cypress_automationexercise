import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';
import { getSearchQuery } from '../../testData/productSearchFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';

import { addProductsAndViewCart } from '../../support/flows/cartFlows';
import {
  deleteLoggedUserViaUi,
  loginFromAuthPage,
  registerUserViaUiAndLogout,
} from '../../support/flows/userFlows';

describe('Regression | Test Case 20: Search Products and Verify Cart After Login', () => {
  let user: User;

  before(() => {
    user = createRandomUser();

    registerUserViaUiAndLogout(user);
  });

  after(() => {
    deleteLoggedUserViaUi(user);
  });

  it('search product, add to cart and verify that product is still in the cart after login', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();
    const query = getSearchQuery();

    home.visit().assertLoaded().goToProductsPage();

    products
      .assertProductsPageVisible()
      .searchProduct(query)
      .assertSearchedProductVisible(query)
      .getFirstVisibleProductId()
      .then((productId) => {
        addProductsAndViewCart(products, [productId]);
        cart
          .assertCartPageVisible()
          .assertProductAddedToCartVisible(productId)
          .goToSignupLoginPage();
        loginFromAuthPage(user);
        home.goToCartPage();
        cart.assertCartPageVisible().assertProductAddedToCartVisible(productId);
      });
  });
});
