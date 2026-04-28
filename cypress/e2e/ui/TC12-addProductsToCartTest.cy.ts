import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';

describe('Smoke | Test Case 12: Add Products in Cart', () => {
  it('add two products to the cart', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();

    home.visit().assertLoaded().goToProductsPage();

    products.getProductPrice(1).as('firstProductPrice');
    products.getProductPrice(2).as('secondProductPrice');

    products.assertProductsPageVisible();
    addProductsToCartAndOpenCart(products, [1, 2]);

    cy.get('@firstProductPrice').then((firstProductPrice) => {
      cy.get('@secondProductPrice').then((secondProductPrice) => {
        cart
          .assertCartPageVisible()
          .assertProductAddedToCartVisible(1, String(firstProductPrice), '1')
          .assertProductAddedToCartVisible(2, String(secondProductPrice), '1');
      });
    });
  });
});
