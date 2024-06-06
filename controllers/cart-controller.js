const cartService = require('../services/cart-service');

class CartController {
  async addToCart(req, res, next) {
    try {
      const payload = req.body;
      const cart = await cartService.addToCart(payload);
      return res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const payload = req.body;
      const cart = await cartService.removeFromCart(payload);
      return res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  async getCart(req, res, next) {
    try {
      const payload = req.body;
      const cart = await cartService.getCart(payload);
      return res.json(cart);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
