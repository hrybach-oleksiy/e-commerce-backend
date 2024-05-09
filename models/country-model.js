const { Schema, model } = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         abbrev:
 *           type: string
 *           description: Country code.
 *         name:
 *           type: string
 *           description: Country name.
 *         postalCodePattern:
 *           type: string
 *           description: Postal code pattern.
 *         postalRegex:
 *           type: string
 *           description: Postal code regexp.
 */

const countrySchema = new Schema({
  abbrev: String,
  name: String,
  postalCodePattern: String,
  postalRegex: String,
});

module.exports = model('Country', countrySchema);
