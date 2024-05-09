const express = require('express');
const countryController = require('../controllers/country-controller');

const countryRouter = express.Router();

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get the list of all countries.
 *     description: Get the list of all countries.
 *     responses:
 *       200:
 *         description: Successful retrieval of the list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */

countryRouter.route('/').get(countryController.getCountries);

module.exports = countryRouter;
