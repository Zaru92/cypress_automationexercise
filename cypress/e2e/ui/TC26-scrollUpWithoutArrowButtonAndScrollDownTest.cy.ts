import { HomePage } from '../../pageObjects/HomePage';

describe('Regression | Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
  it('scroll down home page and scroll up without arrow button', () => {
    const home = new HomePage();

    home
      .visit()
      .assertLoaded()
      .scrollToBottom()
      .assertSubscriptionVisible()
      .scrollToTop()
      .assertPageScrolledToTop()
      .assertHeroTextVisible();
  });
});
