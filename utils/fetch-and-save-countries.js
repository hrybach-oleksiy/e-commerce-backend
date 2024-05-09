const axios = require('axios');
const CountryModel = require('../models/country-model');

const apiUrl = 'https://restcountries.com/v3.1/all';

async function fetchAndSaveCountries() {
  try {
    const response = await axios.get(apiUrl);
    const countriesData = response.data;

    for (const countryData of countriesData) {
      const country = new CountryModel({
        name: countryData.name.common,
      });
      await country.save();
    }

    console.log('Countries data is saved to the Database');
  } catch (error) {
    console.error('Error occurs while saving countries data to Databasae', error);
  }
}

module.exports = fetchAndSaveCountries;
