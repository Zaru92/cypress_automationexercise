import { getRandomBrand } from '../../testData/brandFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Regression | TC19: Brand product navigation', () => {
  it('opens two brand product pages and verifies their headings and URLs', () => {
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
