import { HomePage } from '../../pageObjects/HomePage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Regression | Test Case 13: Verify Product quantity in Cart', () => {
  it('add product to the cart and verify quantity', () => {
    const quantity = 4;

    const home = new HomePage();
    const details = new ProductDetailsPage();
    const cart = new CartPage();

    home.visit().assertLoaded().openFirstProductDetails();

    details.assertProductDetailsPageVisible().setQuantity(quantity).addToCart().openCartFromModal();

    cart.assertProductQuantity(quantity);
  });
});
