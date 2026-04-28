import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | TC17: Remove product from cart', () => {
  it('adds a product, verifies its price and quantity, removes it, and verifies the cart is empty', () => {
    const home = new HomePage();
    const cart = new CartPage();
    const productId = 1;

    home.visit().assertLoaded();
    home.getProductPrice(productId).as('productPrice');
    home.addToCart(productId).openCartFromModal();

    cy.get('@productPrice').then((productPrice) => {
      cart
        .assertCartPageVisible()
        .assertProductsAddedToCartVisible([
          { productId, expectedPrice: String(productPrice), expectedQuantity: '1' },
        ])
        .removeProduct(productId)
        .assertCartIsEmpty();
    });
  });
});
