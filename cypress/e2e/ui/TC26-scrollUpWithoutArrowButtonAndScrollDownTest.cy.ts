import { HomePage } from '../../pageObjects/HomePage';

describe('Regression | TC26: Scroll down and up without arrow button', () => {
  it('scrolls to the subscription section, scrolls back to top manually, and verifies the hero is visible', () => {
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
