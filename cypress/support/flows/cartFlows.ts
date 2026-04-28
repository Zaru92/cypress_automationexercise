type AddToCartPage<TPage> = {
  addToCart(productId: number): TPage;
  continueShopping(): TPage;
  viewCart(): TPage;
};

export const addProductsAndViewCart = <TPage extends AddToCartPage<TPage>>(
  page: TPage,
  productIds: number[],
) => {
  productIds.forEach((productId, index) => {
    page.addToCart(productId);

    if (index < productIds.length - 1) {
      page.continueShopping();
    }
  });

  page.viewCart();

  return page;
};
