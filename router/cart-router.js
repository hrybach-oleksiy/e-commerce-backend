const express = require('express');
const cartController = require('../controllers/cart-controller');

const cartRouter = express.Router();

cartRouter.post('/', cartController.addToCart);
cartRouter.delete('/', cartController.removeFromCart);
cartRouter.post('/clear', cartController.clearCart);
cartRouter.post('/temp-cart', cartController.createTempCart);
cartRouter.post('/load-cart', cartController.getCart);
cartRouter.post('/merge-cart', cartController.mergeCarts);
cartRouter.post('/update-quantity', cartController.updateItemQuantity);
cartRouter.post('/promo-apply', cartController.applyPromo);
cartRouter.post('/promo-remove', cartController.removePromo);

module.exports = cartRouter;
