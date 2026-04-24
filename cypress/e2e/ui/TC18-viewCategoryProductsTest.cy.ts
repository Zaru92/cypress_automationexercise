import { HomePage } from '../../pageObjects/HomePage';
import { CategoryPage } from '../../pageObjects/CategoryPage';

describe('Smoke | Test Case 18: View Category Products', () => {
  it('open category page', () => {
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
