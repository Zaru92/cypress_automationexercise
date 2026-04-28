import { getSearchQuery } from '../../testData/productSearchFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Regression | Test Case 9: Search Product', () => {
  it('search product and verify results', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const query = getSearchQuery();

    home.visit().assertLoaded().goToProductsPage();

    products.assertProductsPageVisible().searchProduct(query).assertSearchedProductVisible(query);
  });
});
