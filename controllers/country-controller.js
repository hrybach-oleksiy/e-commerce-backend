const countryService = require('../services/country-service');

class CountryController {
  async getCountries(req, res, next) {
    try {
      const countries = await countryService.getAllCountries();
      return res.json(countries);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CountryController();
