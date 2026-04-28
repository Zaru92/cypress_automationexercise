import { getRandomCategoryData } from '../../testData/categoryFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Smoke | Test Case 18: View Category Products', () => {
  it('open category page', () => {
    const home = new HomePage();
    const products = new ProductsPage();
    const firstCategory = getRandomCategoryData();
    const secondCategory = getRandomCategoryData(firstCategory);

    home.visit().assertLoaded().viewCategory(firstCategory.category, firstCategory.subcategory);

    products
      .assertCategoryPageVisible()
      .assertProperCategoryVisible(firstCategory.category, firstCategory.subcategory)
      .viewCategory(secondCategory.category, secondCategory.subcategory)
      .assertProperCategoryVisible(secondCategory.category, secondCategory.subcategory);
  });
});
