import { createRandomContactFormData } from '../../testData/contactFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';

describe('Regression | Test Case 21: Add review on product', () => {
  it('open page with products and add review', () => {
    const data = createRandomContactFormData();

    const home = new HomePage();
    const products = new ProductsPage();
    const details = new ProductDetailsPage();

    home.visit().assertLoaded().goToProductsPage();

    products.assertProductsPageVisible().openFirstProductDetails();

    details
      .assertProductDetailsPageVisible()
      .assertReviewFormVisible()
      .fillReviewForm(data)
      .submitReview()
      .assertSuccessMessageVisible();
  });
});
