import { getRandomCategorySelection } from '../../testData/categoryFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Smoke | TC18: Category product navigation', () => {
  it('opens two category product pages and verifies their headings', () => {
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
