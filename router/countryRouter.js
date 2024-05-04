const express = require('express');
const countryController = require('../controllers/country-controller');

const countryRouter = express.Router();

countryRouter.route('/').get(countryController.getCountries);

module.exports = countryRouter;
