import { HomePage } from '../../pageObjects/HomePage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | TC13: Product quantity in cart', () => {
  it('sets product quantity to 4 before adding to cart and verifies the cart quantity', () => {
    const quantity = 4;

    const home = new HomePage();
    const details = new ProductDetailsPage();
    const cart = new CartPage();

    home.visit().assertLoaded().openFirstProductDetails();

    details.assertProductDetailsPageVisible().setQuantity(quantity).addToCart().openCartFromModal();

    cart.assertProductQuantity(quantity);
  });
});
