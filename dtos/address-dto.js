/* eslint-disable no-underscore-dangle */
module.exports = class AddressDto {
  constructor(model) {
    this.id = model._id;
    this.street = model.street;
    this.city = model.city;
    this.postalCode = model.postalCode;
    this.country = model.country;
    this.isDefault = model.isDefault;
  }
};
