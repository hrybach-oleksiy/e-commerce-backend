const { Schema, model } = require('mongoose');
const addressSchema = require('../schemas/address-schema');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  addresses: {
    shippingAddresses: [{ type: addressSchema, required: true }],
    billingAddresses: [{ type: addressSchema, required: false }],
  },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', userSchema);
