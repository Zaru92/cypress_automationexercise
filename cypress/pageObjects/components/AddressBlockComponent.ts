import type { User } from '../../testData/userFactory';

export class AddressBlockComponent {
  assertUserAddressVisible(selector: string, user: User) {
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
