import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';

import { addProductsToCartAndOpenCart } from '../../support/flows/cartFlows';

describe('Smoke | TC12: Add products to cart', () => {
  it('adds two products from the products page and verifies their prices and quantities in the cart', () => {
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
        cart.assertCartPageVisible().assertProductsAddedToCartVisible([
          { productId: 1, expectedPrice: String(firstProductPrice), expectedQuantity: '1' },
          { productId: 2, expectedPrice: String(secondProductPrice), expectedQuantity: '1' },
        ]);
      });
    });
  });
});
