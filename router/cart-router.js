const express = require('express');
const cartController = require('../controllers/cart-controller');

const cartRouter = express.Router();

cartRouter.post('/', cartController.addToCart);
cartRouter.delete('/', cartController.removeFromCart);
cartRouter.get('/:userId', cartController.getCart);

module.exports = cartRouter;