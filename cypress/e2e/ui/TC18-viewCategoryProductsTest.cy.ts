import { getRandomCategorySelection } from '../../testData/categoryFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Smoke | Test Case 18: View Category Products', () => {
  it('open category page', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const firstCategory = getRandomCategorySelection();
    const secondCategory = getRandomCategorySelection(firstCategory);

    home
      .visit()
      .assertLoaded()
      .openCategoryProducts(firstCategory.category, firstCategory.subcategory);

    products
      .assertCategoryPageVisible()
      .assertCategoryProductsHeadingVisible(firstCategory.category, firstCategory.subcategory)
      .openCategoryProducts(secondCategory.category, secondCategory.subcategory)
      .assertCategoryProductsHeadingVisible(secondCategory.category, secondCategory.subcategory);
  });
});
