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

  async clearCart(req, res, next) {
    try {
      const cart = await cartService.clearCart(req.body);
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

  async createTempCart(req, res, next) {
    try {
      const tempCart = await cartService.createTempCart();
      return res.json(tempCart);
    } catch (error) {
      next(error);
    }
  }

  async mergeCarts(req, res, next) {
    try {
      const { tempCartId, userId } = req.body;
      const mergedCart = await cartService.mergeCarts(tempCartId, userId);
      return res.json(mergedCart);
    } catch (error) {
      next(error);
    }
  }

  async updateItemQuantity(req, res, next) {
    try {
      const payload = req.body;
      const updatedCart = await cartService.updateItemQuantity(payload);
      return res.json(updatedCart);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
