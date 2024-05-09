const countriesData = require('./counties-data');
const CountryModel = require('../models/country-model');

async function saveCountriesToDB() {
  CountryModel.insertMany(countriesData)
    .then(() => {
      console.log('Countries data is saved to the Database');
    })
    .catch((error) => {
      console.error('Error occurs while saving countries data to Database:', error);
    });
}

module.exports = saveCountriesToDB;
