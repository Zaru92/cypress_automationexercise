import { CartPage } from '../../pageObjects/CartPage';

type PageWithAddToCartModal<TPage> = {
  addToCart(productId: number): TPage;
  continueShopping(): TPage;
  openCartFromModal(): TPage;
};

export const addProductsToCart = <TPage extends PageWithAddToCartModal<TPage>>(
  page: TPage,
  productIds: number[],
) => {
  cy.logStep(`Add products to cart: ${productIds.join(', ')}`);

  productIds.forEach((productId, index) => {
    cy.logStep(`Add product ${productId} to cart`);
    page.addToCart(productId);

    if (index < productIds.length - 1) {
      cy.logStep('Continue shopping');
      page.continueShopping();
    }
  });

  return page;
};

export const addProductsToCartAndOpenCart = <TPage extends PageWithAddToCartModal<TPage>>(
  page: TPage,
  productIds: number[],
) => {
  addProductsToCart(page, productIds);
  cy.logStep('Open cart from add-to-cart modal');
  page.openCartFromModal();

  return page;
};

export const addProductsToCartAndProceedToCheckout = <TPage extends PageWithAddToCartModal<TPage>>(
  page: TPage,
  productIds: number[],
) => {
  addProductsToCartAndOpenCart(page, productIds);

  cy.logStep('Proceed to checkout');

  return new CartPage().assertCartPageVisible().proceedToCheckout();
};

export const addProductsToCartAndOpenSignupFromCheckout = <
  TPage extends PageWithAddToCartModal<TPage>,
>(
  page: TPage,
  productIds: number[],
) => {
  cy.logStep('Open signup/login from checkout modal');

  return addProductsToCartAndProceedToCheckout(
    page,
    productIds,
  ).goToLoginSignupPageFromCheckoutModal();
};
