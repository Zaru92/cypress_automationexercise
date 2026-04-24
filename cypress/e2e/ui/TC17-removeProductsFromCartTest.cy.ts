import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | Test Case 17: Remove Products From Cart', () => {
  it('add and remove product from the cart', () => {
    const home = new HomePage();
    const cart = new CartPage();

    home.visit().assertLoaded().addToCart(1).viewCart();

    cart
      .assertCartPageVisible()
      .assertProductAddedToCartVisible(1, 'Rs. 500', '1')
      .removeProduct(1)
      .assertCartIsEmpty();
  });
});
