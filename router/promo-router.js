const express = require('express');
const promoController = require('../controllers/promo-controller');

const promoRouter = express.Router();
promoRouter.get('/', promoController.listPromos);
promoRouter.post('/', promoController.createPromo);
promoRouter.delete('/:id', promoController.deletePromoById);

module.exports = promoRouter;
