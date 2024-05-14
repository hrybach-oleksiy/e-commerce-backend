const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           description: The street address.
 *           example: Baker Street
 *         city:
 *           type: string
 *           description: The city.
 *           example: London
 *         postalCode:
 *           type: string
 *           description: The postal code.
 *           example: E17DR
 *         country:
 *           type: string
 *           description: The country.
 *           example: Great Britain
 *         isDefault:
 *           type: boolean
 *           description: Whether the address is default
 *           example: true
 *       required:
 *         - street
 *         - city
 *         - postalCode
 *         - country
 *         - isDefault
 */

const addressSchema = new mongoose.Schema({
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
  isDefault: { type: Boolean, default: false },
});

module.exports = addressSchema;
