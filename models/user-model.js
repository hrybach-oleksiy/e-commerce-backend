const { Schema, model } = require('mongoose');

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
 *         password:
 *           type: string
 *           description: The password of the user.
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the user.
 *         street:
 *           type: string
 *           description: The street address of the user.
 *         city:
 *           type: string
 *           description: The city of the user.
 *         postalCode:
 *           type: string
 *           description: The postal code of the user.
 *         country:
 *           type: string
 *           description: The country of the user.
 *         isActivated:
 *           type: boolean
 *           description: Indicates whether the user account is activated.
 *         activationLink:
 *           type: string
 *           description: The activation link for the user account.
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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },

  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', userSchema);
