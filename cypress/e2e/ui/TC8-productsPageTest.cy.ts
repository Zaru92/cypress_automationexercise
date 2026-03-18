import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';

describe('Smoke | Test Case 8: Verify All Products and product detail page', () => {
  it('open page with products', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const details = new ProductDetailsPage();

    home.visit().assertLoaded().goToProductsPage();

    products.assertProductsPageVisible().viewFirstProduct();

    details.assertProductDetailsPageVisible();
  });
});
