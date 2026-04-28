import { HomePage } from '../../pageObjects/HomePage';

describe('Regression | Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', () => {
  it('scroll down home page and scroll up using arrow button', () => {
    const home = new HomePage();

    home
      .visit()
      .assertLoaded()
      .scrollToBottom()
      .assertSubscriptionVisible()
      .clickScrollUpArrow()
      .assertPageScrolledToTop()
      .assertHeroTextVisible();
  });
});
