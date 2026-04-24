import { HomePage } from '../../pageObjects/HomePage';
import { CategoryPage } from '../../pageObjects/CategoryPage';

describe('Smoke | Test Case 8: Verify All Products and product detail page', () => {
  it('open page with products', () => {
    const home = new HomePage();
    const category = new CategoryPage();

    home.visit().assertLoaded().viewCategory('Women', 'Dress');

    category
      .assertCategoryPageVisible()
      .assertProperCategoryVisible('Women', 'Dress')
      .viewCategory('Men', 'Jeans')
      .assertProperCategoryVisible('Men', 'Jeans');
  });
});
