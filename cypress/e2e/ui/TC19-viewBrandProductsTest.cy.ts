import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { getRandomBrand } from '../../testData/brandFactory';

describe('Regression | Test Case 19: View & Cart Brand Products', () => {
  it('open brand page', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const firstBrand = getRandomBrand();
    const secondBrand = getRandomBrand(firstBrand);

    home.visit().assertLoaded().goToProductsPage();

    products
      .viewBrand(firstBrand.brand)
      .assertProperBrandVisible(firstBrand.brand)
      .viewBrand(secondBrand.brand)
      .assertProperBrandVisible(secondBrand.brand);
  });
});
