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
  productIds.forEach((productId, index) => {
    page.addToCart(productId);

    if (index < productIds.length - 1) {
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
  page.openCartFromModal();

  return page;
};

export const addProductsToCartAndProceedToCheckout = <TPage extends PageWithAddToCartModal<TPage>>(
  page: TPage,
  productIds: number[],
) => {
  addProductsToCartAndOpenCart(page, productIds);

  return new CartPage().assertCartPageVisible().proceedToCheckout();
};

export const addProductsToCartAndOpenSignupFromCheckout = <
  TPage extends PageWithAddToCartModal<TPage>,
>(
  page: TPage,
  productIds: number[],
) => addProductsToCartAndProceedToCheckout(page, productIds).goToLoginSignupPageFromCheckoutModal();
