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
 *         street:
 *           type: string
 *           description: The street address of the user.
 *           example: Baker Street
 *         city:
 *           type: string
 *           description: The city of the user.
 *           example: London
 *         postalCode:
 *           type: string
 *           description: The postal code of the user.
 *           example: E17DR
 *         country:
 *           type: string
 *           description: The country of the user.
 *           example: Great Britain
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - dateOfBirth
 *         - street
 *         - city
 *         - postalCode
 *         - country
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
