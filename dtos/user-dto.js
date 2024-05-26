/* eslint-disable no-underscore-dangle */
module.exports = class UserDto {
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.dateOfBirth = model.dateOfBirth;
    this.addresses = {
      shippingAddresses: model.addresses.shippingAddresses.map((addr) => ({
        street: addr.street,
        city: addr.city,
        postalCode: addr.postalCode,
        country: addr.country,
        isDefault: addr.isDefault,
        id: addr._id,
      })),
      billingAddresses: model.addresses.billingAddresses.map((addr) => ({
        street: addr.street,
        city: addr.city,
        postalCode: addr.postalCode,
        country: addr.country,
        isDefault: addr.isDefault,
        id: addr._id,
      })),
    };
  }
};
