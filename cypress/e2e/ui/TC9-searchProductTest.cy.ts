import { getRandomProductSearchQuery } from '../../testData/productSearchFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Regression | Test Case 9: Search Product', () => {
  it('search product and verify results', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const query = getRandomProductSearchQuery();

    home.visit().assertLoaded().goToProductsPage();

    products
      .assertProductsPageVisible()
      .searchProduct(query)
      .assertSearchResultsContainProduct(query);
  });
});
