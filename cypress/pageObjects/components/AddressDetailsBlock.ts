import type { TestUser } from '../../testData/userFactory';

export class AddressDetailsBlock {
  assertUserAddressVisible(selector: string, user: TestUser) {
    cy.get(selector).within(() => {
      [
        user.firstName,
        user.lastName,
        user.company,
        user.address1,
        user.address2,
        user.city,
        user.state,
        user.zipcode,
        user.country,
        user.mobile,
      ].forEach((value) => {
        cy.contains(value);
      });
    });

    return this;
  }
}
