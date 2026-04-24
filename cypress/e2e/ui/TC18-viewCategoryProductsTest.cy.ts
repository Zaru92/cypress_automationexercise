import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Smoke | Test Case 18: View Category Products', () => {
  it('open category page', () => {
    const home = new HomePage();
    const products = new ProductsPage();

    home.visit().assertLoaded().viewCategory('Women', 'Dress');

    products
      .assertCategoryPageVisible()
      .assertProperCategoryVisible('Women', 'Dress')
      .viewCategory('Men', 'Jeans')
      .assertProperCategoryVisible('Men', 'Jeans');
  });
});
