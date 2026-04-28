export type CatalogApiMethod = 'GET' | 'POST' | 'PUT';

export type ProductsListBody = {
  products: unknown[];
};

export type BrandsListBody = {
  brands: unknown[];
};

export type SearchProduct = {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: object;
};

export type SearchProductBody = {
  responseCode: number;
  products: SearchProduct[];
};

export const requestProductsListViaApi = (method: CatalogApiMethod = 'GET') =>
  cy.request(method, '/api/productsList');

export const requestBrandsListViaApi = (method: CatalogApiMethod = 'GET') =>
  cy.request(method, '/api/brandsList');

export const searchProductsViaApi = (searchProduct?: string) =>
  cy.request({
    method: 'POST',
    url: '/api/searchProduct',
    form: true,
    ...(searchProduct === undefined ? {} : { body: { search_product: searchProduct } }),
  });
