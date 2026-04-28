import { createRandomUser } from '../../testData/userFactory';
import type { User } from '../../testData/userFactory';
import { parseApiResponse } from '../../support/apiResponse';

describe('API | API 13: PUT METHOD To Update User Account', () => {
  let user: User;
  let newUser: User;

  before(() => {
    user = createRandomUser();

    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: user.title,
        birth_date: user.dob.day,
        birth_month: user.dob.month,
        birth_year: user.dob.year,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company,
        address1: user.address1,
        address2: user.address2,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobile,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(201);
      expect(body.message).to.eq('User created!');
    });
  });

  after(() => {
    cy.request({
      method: 'DELETE',
      url: '/api/deleteAccount',
      form: true,
      body: {
        email: user.email,
        password: user.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(200);
      expect(body.message).to.eq('Account deleted!');
    });
  });

  it('update user account', () => {
    newUser = createRandomUser();

    cy.request({
      method: 'PUT',
      url: '/api/updateAccount',
      form: true,
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: newUser.title,
        birth_date: newUser.dob.day,
        birth_month: newUser.dob.month,
        birth_year: newUser.dob.year,
        firstname: newUser.firstName,
        lastname: newUser.lastName,
        company: newUser.company,
        address1: newUser.address1,
        address2: newUser.address2,
        country: newUser.country,
        zipcode: newUser.zipcode,
        state: newUser.state,
        city: newUser.city,
        mobile_number: newUser.mobile,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const body = parseApiResponse(response);

      expect(body.responseCode).to.eq(200);
      expect(body.message).to.eq('User updated!');
    });
  });
});
