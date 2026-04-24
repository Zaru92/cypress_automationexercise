import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Regression | Test Case 19: View & Cart Brand Products', () => {
  it('open brand page', () => {
    const home = new HomePage();
    const products = new ProductsPage();

    home.visit().assertLoaded().goToProductsPage();

    products
      .viewBrand('Polo')
      .assertProperBrandVisible('Polo')
      .viewBrand('Biba')
      .assertProperBrandVisible('Biba');
  });
});
