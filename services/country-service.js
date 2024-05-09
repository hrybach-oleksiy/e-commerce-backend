const CountryModel = require('../models/country-model');

class CountryService {
  async getAllCountries() {
    const countries = await CountryModel.find();
    return countries;
  }
}

module.exports = new CountryService();
