import { createRandomContactFormData } from '../../testData/contactFactory';

import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';

describe('Regression | TC21: Product review submission', () => {
  it('opens a product details page, submits a review, and verifies the success message', () => {
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
