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
      const cart = await cartService.getCartWithProducts(payload);
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

  async applyPromo(req, res, next) {
    try {
      const updatedCart = await cartService.applyPromo({
        userId: req.body.userId,
        tempCartId: req.body.tempCartId,
        promoCodeId: req.body.promoCodeId,
      });
      return res.json(updatedCart);
    } catch (error) {
      next(error);
    }
  }

  async removePromo(req, res, next) {
    try {
      const updatedCart = await cartService.removePromo({
        userId: req.body.userId,
        tempCartId: req.body.tempCartId,
      });
      return res.json(updatedCart);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
