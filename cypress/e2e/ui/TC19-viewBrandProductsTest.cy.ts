import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Smoke | Test Case 18: View Category Products', () => {
  it('open category page', () => {
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
