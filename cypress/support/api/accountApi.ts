import type { TestUser } from '../../testData/userFactory';

type AccountApiRequestBody = {
  name: string;
  email: string;
  password: string;
  title: TestUser['title'];
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
};

const buildAccountApiRequestBody = (
  identityUser: TestUser,
  detailsUser: TestUser,
): AccountApiRequestBody => ({
  name: identityUser.name,
  email: identityUser.email,
  password: identityUser.password,
  title: detailsUser.title,
  birth_date: detailsUser.dob.day,
  birth_month: detailsUser.dob.month,
  birth_year: detailsUser.dob.year,
  firstname: detailsUser.firstName,
  lastname: detailsUser.lastName,
  company: detailsUser.company,
  address1: detailsUser.address1,
  address2: detailsUser.address2,
  country: detailsUser.country,
  zipcode: detailsUser.zipcode,
  state: detailsUser.state,
  city: detailsUser.city,
  mobile_number: detailsUser.mobile,
});

export const createAccountViaApi = (user: TestUser) =>
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: buildAccountApiRequestBody(user, user),
  });

export const deleteAccountViaApi = (user: Pick<TestUser, 'email' | 'password'>) =>
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: {
      email: user.email,
      password: user.password,
    },
  });

export const verifyLoginViaApi = (email: string, password: string) =>
  cy.request({
    method: 'POST',
    url: '/api/verifyLogin',
    form: true,
    body: {
      email,
      password,
    },
  });

export const updateAccountViaApi = (identityUser: TestUser, detailsUser: TestUser) =>
  cy.request({
    method: 'PUT',
    url: '/api/updateAccount',
    form: true,
    body: buildAccountApiRequestBody(identityUser, detailsUser),
  });

export const getUserDetailsByEmail = (email: string) =>
  cy.request({
    method: 'GET',
    url: '/api/getUserDetailByEmail',
    qs: {
      email,
    },
  });
