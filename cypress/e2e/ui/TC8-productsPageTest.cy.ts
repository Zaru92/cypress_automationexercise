import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';

describe('Smoke | TC8: Products page and product details', () => {
  it('opens the products page and verifies the first product details page', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const details = new ProductDetailsPage();

    home.visit().assertLoaded().goToProductsPage();

    products.assertProductsPageVisible().openFirstProductDetails();

    details.assertProductDetailsPageVisible();
  });
});
