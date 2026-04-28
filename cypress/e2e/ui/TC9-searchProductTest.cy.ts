import { getRandomProductSearchQuery } from '../../testData/productSearchFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Regression | TC9: Product search results', () => {
  it('searches for a product and verifies at least one result matches the query', () => {
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
