import { getRandomBrand } from '../../testData/brandFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Regression | Test Case 19: View & Cart Brand Products', () => {
  it('open brand page', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const firstBrand = getRandomBrand();
    const secondBrand = getRandomBrand(firstBrand);

    home.visit().assertLoaded().goToProductsPage();

    products
      .openBrandProducts(firstBrand.brand)
      .assertBrandProductsPageVisible(firstBrand.brand)
      .openBrandProducts(secondBrand.brand)
      .assertBrandProductsPageVisible(secondBrand.brand);
  });
});
