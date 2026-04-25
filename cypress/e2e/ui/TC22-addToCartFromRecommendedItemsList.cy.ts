import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Smoke | Test Case 12: Add Products in Cart', () => {
  it('add two products to the cart', () => {
    const home = new HomePage();
    const cart = new CartPage();

    home
      .visit()
      .assertLoaded()
      .getFirstVisibleRecommendedProductId()
      .then((productId) => {
        home.addToCartFirstVisibleRecommendedProduct(productId).viewCart();
        cart.assertCartPageVisible().assertProductAddedToCartVisible(productId);
      });
  });
});
