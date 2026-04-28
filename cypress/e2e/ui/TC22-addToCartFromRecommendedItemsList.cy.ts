import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Smoke | TC22: Add recommended item to cart', () => {
  it('adds the first visible recommended item to the cart and verifies it is shown', () => {
    const home = new HomePage();
    const cart = new CartPage();

    home
      .visit()
      .assertLoaded()
      .getFirstVisibleRecommendedProductId()
      .then((productId) => {
        home.addRecommendedProductToCart(productId).openCartFromModal();
        cart.assertCartPageVisible().assertProductAddedToCartVisible(productId);
      });
  });
});
