const AddressDto = require('./address-dto');

/* eslint-disable no-underscore-dangle */
module.exports = class UserDto {
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.isRoot = model.isRoot;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.dateOfBirth = model.dateOfBirth;
    this.addresses = {
      shippingAddresses: model.addresses.shippingAddresses.map((addr) => new AddressDto(addr)),
      billingAddresses: model.addresses.billingAddresses.map((addr) => new AddressDto(addr)),
    };
  }
};
