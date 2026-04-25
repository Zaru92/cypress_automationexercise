import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Smoke | Test Case 22: Add to cart from Recommended items', () => {
  it('add recommended item to cart', () => {
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
