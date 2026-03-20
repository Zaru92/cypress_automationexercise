import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Smoke | Test Case 12: Add Products in Cart', () => {
  it('open page with products', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const cart = new CartPage();

    home.visit().assertLoaded().goToProductsPage();

    products.assertProductsPageVisible().addToCart(1).continueShopping().addToCart(2).viewCart();

    cart
      .assertCartPageVisible()
      .assertProductAddedToCartVisible(1)
      .assertProductAddedToCartVisible(2);
  });
});
