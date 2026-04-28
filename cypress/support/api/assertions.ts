import type { User } from '../../testData/userFactory';
import { parseApiResponse } from '../apiResponse';

export type ApiMessageBody = {
  responseCode: number;
  message: string;
};

export type ApiUser = {
  name: string;
  email: string;
  title: User['title'];
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

export type ApiUserDetailsBody = {
  responseCode: number;
  user: Partial<ApiUser>;
};

export const expectApiBody = <TBody>(response: Cypress.Response<string | TBody>): TBody => {
  expect(response.status).to.eq(200);
  return parseApiResponse<TBody>(response);
};

export const expectApiMessage = <TBody extends ApiMessageBody>(
  response: Cypress.Response<string | TBody>,
  responseCode: number,
  message: string,
): TBody => {
  const body = expectApiBody<TBody>(response);

  expect(body.responseCode).to.eq(responseCode);
  expect(body.message).to.eq(message);

  return body;
};

export const expectSuccessfulCreateAccount = (
  response: Cypress.Response<string | ApiMessageBody>,
) => expectApiMessage(response, 201, 'User created!');

export const expectSuccessfulDeleteAccount = (
  response: Cypress.Response<string | ApiMessageBody>,
) => expectApiMessage(response, 200, 'Account deleted!');

export const expectApiUserMatches = (
  actualUser: Partial<ApiUser>,
  identityUser: User,
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
