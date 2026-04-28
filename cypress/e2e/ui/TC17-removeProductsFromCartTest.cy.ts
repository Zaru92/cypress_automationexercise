import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | Test Case 17: Remove Products From Cart', () => {
  it('add and remove product from the cart', () => {
    const home = new HomePage();
    const cart = new CartPage();
    const productId = 1;

    home.visit().assertLoaded();
    home.getProductPrice(productId).as('productPrice');
    home.addToCart(productId).openCartFromModal();

    cy.get('@productPrice').then((productPrice) => {
      cart
        .assertCartPageVisible()
        .assertProductAddedToCartVisible(productId, String(productPrice), '1')
        .removeProduct(productId)
        .assertCartIsEmpty();
    });
  });
});
