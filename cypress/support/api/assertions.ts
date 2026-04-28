import type { TestUser } from '../../testData/userFactory';
import { parseApiResponse } from './apiResponse';
import type { SearchProductBody } from './catalogApi';

export type ApiMessageResponseBody = {
  responseCode: number;
  message: string;
};

export type ApiUserDetails = {
  name: string;
  email: string;
  title: TestUser['title'];
  birth_day: string;
  birth_month: string;
  birth_year: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
};

export type GetUserDetailsResponseBody = {
  responseCode: number;
  user: Partial<ApiUserDetails>;
};

export const expectOkApiResponseBody = <TBody>(
  response: Cypress.Response<string | TBody>,
): TBody => {
  expect(response.status).to.eq(200);

  return parseApiResponse<TBody>(response);
};

export const expectApiResponseMessage = <TBody extends ApiMessageResponseBody>(
  response: Cypress.Response<string | TBody>,
  responseCode: number,
  message: string,
): TBody => {
  const body = expectOkApiResponseBody<TBody>(response);

  expect(body.responseCode).to.eq(responseCode);
  expect(body.message).to.eq(message);

  return body;
};

export const expectArrayResponseProperty = <TProperty extends string>(
  response: Cypress.Response<string | Record<TProperty, unknown[]>>,
  propertyName: TProperty,
) => {
  const body = expectOkApiResponseBody<Record<TProperty, unknown[]>>(response);

  expect(body).to.have.property(propertyName);
  expect(body[propertyName]).to.be.an('array');

  return body;
};

export const expectSearchProductsResponse = (
  response: Cypress.Response<string | SearchProductBody>,
) => {
  const body = expectOkApiResponseBody<SearchProductBody>(response);

  expect(body.responseCode).to.eq(200);
  expect(body).to.have.property('products');
  expect(body.products).to.be.an('array').and.have.length.greaterThan(0);

  body.products.forEach((product) => {
    expect(product).to.include.keys(['id', 'name', 'price', 'brand', 'category']);
    expect(product.name).to.be.a('string').and.have.length.greaterThan(0);
    expect(product.price).to.be.a('string').and.have.length.greaterThan(0);
    expect(product.brand).to.be.a('string').and.have.length.greaterThan(0);
    expect(product.category).to.be.an('object');
  });

  return body;
};

export const expectSuccessfulCreateAccount = (
  response: Cypress.Response<string | ApiMessageResponseBody>,
) => expectApiResponseMessage(response, 201, 'User created!');

export const expectSuccessfulDeleteAccount = (
  response: Cypress.Response<string | ApiMessageResponseBody>,
) => expectApiResponseMessage(response, 200, 'Account deleted!');

export const expectApiUserDetailsToMatch = (
  actualUser: Partial<ApiUserDetails>,
  identityUser: TestUser,
  detailsUser = identityUser,
) => {
  expect(actualUser).to.include({
    name: identityUser.name,
    email: identityUser.email,
    title: detailsUser.title,
    birth_day: detailsUser.dob.day,
    birth_month: detailsUser.dob.month,
    birth_year: detailsUser.dob.year,
    first_name: detailsUser.firstName,
    last_name: detailsUser.lastName,
    company: detailsUser.company,
    address1: detailsUser.address1,
    address2: detailsUser.address2,
    country: detailsUser.country,
    state: detailsUser.state,
    city: detailsUser.city,
    zipcode: detailsUser.zipcode,
  });
};
