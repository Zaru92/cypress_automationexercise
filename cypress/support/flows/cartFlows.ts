type PageWithAddToCartModal<TPage> = {
  addToCart(productId: number): TPage;
  continueShopping(): TPage;
  openCartFromModal(): TPage;
};

export const addProductsToCartAndOpenCart = <TPage extends PageWithAddToCartModal<TPage>>(
  page: TPage,
  productIds: number[],
) => {
  productIds.forEach((productId, index) => {
    page.addToCart(productId);

    if (index < productIds.length - 1) {
      page.continueShopping();
    }
  });

  page.openCartFromModal();

  return page;
};
