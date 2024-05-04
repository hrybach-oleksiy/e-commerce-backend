const CountryModel = require('../models/country-model');

class CountryService {
  async getAllCountries() {
    const users = await CountryModel.find();
    return users;
  }
}

module.exports = new CountryService();
