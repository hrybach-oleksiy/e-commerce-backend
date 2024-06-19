const { Schema, model } = require('mongoose');

const countrySchema = new Schema({
  abbrev: String,
  name: String,
  postalCodePattern: String,
  postalRegex: String,
});

module.exports = model('Country', countrySchema);
