const { Schema, model } = require('mongoose');
const addressSchema = require('../schemas/address-schema');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           example: test@test.com
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *           example: Smith@123
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *           example: Alex
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *           example: Smith
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the user.
 *           example: 1986-08-29
 *         addresses:
 *           type: object
 *           properties:
 *             shippingAddresses:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *             billingAddresses:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *           required:
 *             - shippingAddresses
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - dateOfBirth
 *         - shippingAddresses
 */

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
