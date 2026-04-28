import { HomePage } from '../../pageObjects/HomePage';

describe('Regression | TC25: Scroll down and up with arrow button', () => {
  it('scrolls to the subscription section, uses the arrow button to scroll up, and verifies the hero is visible', () => {
    const home = new HomePage();

    home
      .visit()
      .assertLoaded()
      .scrollToBottom()
      .assertSubscriptionVisible()
      .scrollToTopUsingArrow()
      .assertPageScrolledToTop()
      .assertHeroTextVisible();
  });
});
